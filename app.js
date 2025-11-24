import express from 'express';
import mongoDbConnection from './config/dbConnection.js';
import dotenv from 'dotenv'
import usersRouter from './routes/user.js';
import adminRouter from './routes/admin.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

//mongodb connection
mongoDbConnection();

// Routes
app.use('/api/user', usersRouter);
app.use('/admin', adminRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
