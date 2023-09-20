import { Request, Response, NextFunction } from 'express';
import {Error as mongooseError} from 'mongoose';
import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../utils/RequestError.js';


const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(STATUS_CODES.NOT_FOUND);
  console.log('not found');
  next(error);
};

const errorHandler = (error: mongooseError | Error | RequestError ,req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === STATUS_CODES.OK ? STATUS_CODES.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = error.message;

  if (error instanceof RequestError) {
    statusCode = error.statusCode;
  }

  // If Mongoose validation error, set to 400 and change message
  if (error instanceof mongooseError.ValidationError) {
    statusCode = STATUS_CODES.BAD_REQUEST;
    message = 'Invalid data';
  }

  // If Mongoose not found error, set to 404 and change message
  if (error instanceof mongooseError.CastError && error.kind === 'ObjectId') {
    statusCode = STATUS_CODES.NOT_FOUND;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export { notFound, errorHandler };