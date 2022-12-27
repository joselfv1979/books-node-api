import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).json(err.message);
  } else {
    res.status(500).json("Something went wrong");
  }
};
