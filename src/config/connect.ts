import mongoose from "mongoose";
import { DB_CONN_STRING } from "./config";

if (!DB_CONN_STRING) {
  console.error("Remember to have environment variables on a  file .env");
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

//connection mongodb atlas
export const connect = () => {
  mongoose
    .connect(DB_CONN_STRING as string, options)
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
