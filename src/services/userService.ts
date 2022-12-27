import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";

export async function getUsersService() {
  return await User.find().populate("books", {
    title: 1,
  });
}

export async function getUserService(id: string) {
  return await User.findById(new ObjectId(id));
}

export async function getUsernameService(username: string) {
  return await User.findOne({ username: username });
}

export async function getEmailService(email: string) {
  return await User.findOne({ email: email });
}

export async function createUserService(user: IUser) {
  return await user.save();
}

export async function updateUserService(id: string, user: IUser) {
  return await User.findByIdAndUpdate(new ObjectId(id), user, { new: true });
}

export async function deleteUserService(id: string) {
  return await User.findByIdAndDelete(new ObjectId(id));
}
