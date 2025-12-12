import dotenv from 'dotenv';
dotenv.config();

import cloudinary from "./config/cloudinary.js";

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload("test.jpg"); // put a test.jpg in root
    console.log("Upload successful! URL:", result.url);
  } catch (err) {
    console.error("Upload error:", err);
  }
}

testUpload();
