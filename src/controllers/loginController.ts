import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { CustomError } from "../models/CustomError";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { getUsernameService } from "../services/userService";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next(new CustomError(400, "Bad request"));

    const user = await getUsernameService(username);

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      return next(new CustomError(401, "Invalid credentials"));
    }

    const token = generateToken(user.id, username, JSON.stringify(user.roles));

    res.status(200).json({
      id: user.id,
      username,
      roles: user.roles,
      token,
    });
  } catch (error) {
    next(new CustomError(500, "Couldn't login user, try it later"));
  }
}
