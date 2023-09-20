import path from 'path';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import User from './types/User.js';
import { Types } from 'mongoose';
dotenv.config();

// Augment the Express Request type with a user property
declare global {
  namespace Express {
    interface Request {
      userId:  Types.ObjectId;
    }
  }
}


const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));