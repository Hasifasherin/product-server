import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", 
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

export default multer({ storage });
