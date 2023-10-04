import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

export const app = express();

// APP CONFIGS
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);


const port = process.env.PORT || 5000;

await connectDB()

https.createServer(
    {
        key: fs.readFileSync("./src/certs/key.pem"),
        cert: fs.readFileSync("./src/certs/cert.pem"),
    }, app)
    .listen(port, () => {
        console.log(`serever is runing at port ${port}`);
});

