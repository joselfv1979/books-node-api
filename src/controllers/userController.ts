import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../models/CustomError";
import bcrypt from "bcrypt";

import {
  getUserService,
  getUsersService,
  getUsernameService,
  getEmailService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch users, try it later"));
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await getUserService(id);
    if (!user) return next(new CustomError(404, "User not found"));

    res.status(200).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password, roles } = req.body;
    const photo = req.file ? req.file.path : "";

    if (!fullname || !username || !email || !password || !roles) {
      return next(new CustomError(400, "Bad request"));
    }

    const usernameExists = await getUsernameService(username);
    if (usernameExists)
      return next(new CustomError(409, "Username already exists"));

    const emailExists = await getEmailService(email);
    if (emailExists)
      return next(new CustomError(409, "Email address already exists"));

    const SaltRounds = 10;
    const passwordHash = await bcrypt.hash(password, SaltRounds);
    const newUser: IUser = new User({
      fullname,
      username,
      email,
      passwordHash,
      roles,
      imagePath: photo,
    });

    const response = await createUserService(newUser);
    res.status(201).json(response);
  } catch (error) {
    next(new CustomError(500, "Couldn't create new user, try it later"));
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { fullname, username, email, image } = req.body;
    const photo = req.file ? req.file.path : image;

    if (!id || !fullname || !username || !email) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBody = { ...req.body, imagePath: photo };

    const user = await updateUserService(id, newBody);
    if (!user) return next(new CustomError(404, "User not found"));

    res.status(201).json(user);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const user = await deleteUserService(id);
    if (!user) return next(new CustomError(404, "User not found"));

    return res.status(204).end();
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}
