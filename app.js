import express from 'express';
import cors from 'cors';
import mongoDbConnection from './config/dbConnection.js';
import dotenv from 'dotenv';
import usersRouter from './routes/user.js';
import adminRouter from './routes/admin.js';
import cloudinary from "./config/cloudinary.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",  
    credentials: true
}));

// MongoDB connection
mongoDbConnection();

// Routes
app.use('/', usersRouter);      
app.use('/admin', adminRouter); 
// app.use("/assets", express.static("assets")); // you can keep this also

// app.use("/uploads", express.static("uploads"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
