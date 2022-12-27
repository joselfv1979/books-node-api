import { Router } from "express";

import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";
import imageHandler from "../middlewares/imageHandler";
import authHandler from "../middlewares/authHandler";

const usersRouter = Router();

usersRouter.get("/", authHandler, getUsersController);
usersRouter.get("/:id", getUserController);
usersRouter.post("/", imageHandler.single("image"), createUserController);
usersRouter.put(
  "/:id",
  authHandler,
  imageHandler.single("image"),
  updateUserController
);
usersRouter.delete("/:id", authHandler, deleteUserController);

export default usersRouter;
