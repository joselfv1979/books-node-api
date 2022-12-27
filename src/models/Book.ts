import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  price: Number;
  pages: Number;
  imagePath: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  imagePath: { type: String },
  createdAt: { type: Date, default: Date.now },
});

BookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default model<IBook>("Book", BookSchema);
