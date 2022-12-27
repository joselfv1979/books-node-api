import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";

export interface AuthRequest extends Request {
  userId: string;
}

const authHandler = (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");

  if (!authorization) {
    return next(new CustomError(401, "Unauthorized"));
  }

  let token = "";

  if (authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  if (
    !token ||
    token.length === 0 ||
    token === "null" ||
    token === "undefined"
  ) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  let decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken) {
    return next(new CustomError(401, "token missing or invalid"));
  }

  const { id: userId } = decodedToken;

  request.userId = userId;

  next();
};

export default authHandler;
