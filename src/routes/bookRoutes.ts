import { Router } from "express";

import {
  getBooksController,
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController";
import imageHandler from "../middlewares/imageHandler";
import authHandler from "../middlewares/authHandler";

const booksRouter = Router();

booksRouter.get("/", getBooksController);
booksRouter.get("/:id", getBookController);
booksRouter.post(
  "/",
  authHandler,
  imageHandler.single("image"),
  createBookController
);
booksRouter.put(
  "/:id",
  authHandler,
  imageHandler.single("image"),
  updateBookController
);
booksRouter.delete("/:id", authHandler, deleteBookController);

export default booksRouter;
