import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const { mimetype } = file;
  if (
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg" ||
    mimetype === "image/jfif" ||
    mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

export default multer({ storage, fileFilter });
