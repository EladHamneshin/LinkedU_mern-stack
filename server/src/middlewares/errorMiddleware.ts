import { Request, Response, NextFunction } from 'express';
import {Error as mongooseError} from 'mongoose';
import STATUS_CODES from '../utils/StatusCodes.js';
class CastError extends mongooseError.CastError {}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(STATUS_CODES.NOT_FOUND);
  console.log('not found');
  next(error);
};

const errorHandler = (error: CastError | Error ,req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === STATUS_CODES.OK ? STATUS_CODES.INTERNAL_SERVER_ERROR : res.statusCode;
  let message = error.message;

  // If Mongoose not found error, set to 404 and change message
  if (error instanceof CastError && error.kind === 'ObjectId') {
    statusCode = STATUS_CODES.NOT_FOUND;
    message = 'Resource not found';
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

export { notFound, errorHandler };