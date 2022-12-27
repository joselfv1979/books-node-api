import Book, { IBook } from "../models/Book";
import { ObjectId } from "mongodb";

export async function getBooksService() {
  return await Book.find();
}

export async function getBookService(id: string) {
  return await Book.findById(new ObjectId(id));
}

export async function createBookService(book: IBook) {
  return await book.save();
}

export async function updateBookService(id: string, book: IBook) {
  return await Book.findByIdAndUpdate(new ObjectId(id), book, { new: true });
}

export async function deleteBookService(id: string) {
  return await Book.findByIdAndDelete(new ObjectId(id));
}
