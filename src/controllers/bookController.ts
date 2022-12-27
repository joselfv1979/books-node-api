import { NextFunction, Request, Response } from "express";
import Book, { IBook } from "../models/Book";
import { CustomError } from "../models/CustomError";

import {
  getBooksService,
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

export async function getBooksController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await getBooksService();
    res.json(books);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch books, try it later"));
  }
}

export async function getBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const book = await getBookService(id);
    if (!book) return next(new CustomError(404, "Book not found"));

    res.status(200).json(book);
  } catch (error) {
    next(new CustomError(500, "Couldn't fetch book, try it later"));
  }
}

export async function createBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, author, price, pages } = req.body;
    const photo = req.file ? req.file.path : "";

    if (!title || !author || !price || !pages) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBook: IBook = new Book({
      title,
      author,
      price,
      pages,
      imagePath: photo,
    });

    const book = await createBookService(newBook);
    res.status(201).json(book);
  } catch (error) {
    next(new CustomError(500, "Couldn't create book, try it later"));
  }
}

export async function updateBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, author, price, pages, image } = req.body;
    const photo = req.file ? req.file.path : image;

    if (!id || !title || !author || !price || !pages) {
      return next(new CustomError(400, "Bad request"));
    }

    const newBody = { ...req.body, imagePath: photo };

    const book = await updateBookService(id, newBody);
    if (!book) return next(new CustomError(404, "Book not found"));

    res.status(201).json(book);
  } catch (error) {
    next(new CustomError(500, "Couldn't update book, try it later"));
  }
}

export async function deleteBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    if (!id) return next(new CustomError(400, "Bad request"));

    const book = await deleteBookService(id);
    if (!book) return next(new CustomError(404, "Book not found"));

    res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete book, try it later"));
  }
}
