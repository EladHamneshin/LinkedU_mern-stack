//import path from 'path';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './configs/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const port = process.env.PORT || 5000;



export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

app.use(notFound);
app.use(errorHandler);


connectDB().then(()=>{
    https.createServer(
        {
            key: fs.readFileSync("./src/assets/key.pem"),
            cert: fs.readFileSync("./src/assets/cert.pem"),
        },
        app)
        .listen(port, () => {
            console.log(`serever is runing at port ${port}`);
        });
})
