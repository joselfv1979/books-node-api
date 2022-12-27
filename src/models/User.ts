import { Schema, model, Document } from "mongoose";
import { IBook } from "./Book";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: string[];
  imagePath: string;
  books: Array<IBook>;
}

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], required: true },
  imagePath: { type: String },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

export default model<IUser>("User", UserSchema);
