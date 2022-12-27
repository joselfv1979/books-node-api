import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

export async function createAdminUser() {
  try {
    const adminUser = await User.findOne({ username: "admin" });
    if (adminUser) {
      return;
    } else {
      const passwordHash = await bcrypt.hash("1234", 10);
      const admin: IUser = new User({
        fullname: "admin",
        username: "admin",
        email: "admin@gmail.com",
        passwordHash,
        roles: ["admin"],
      });
      await admin.save();
    }
  } catch (error) {
    console.log(error);
  }
}
