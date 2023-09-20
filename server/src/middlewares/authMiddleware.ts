import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import { Request } from 'express';
import STATUS_CODES from '../utils/StatusCodes.js';

const protect = asyncHandler(async (req: Request , res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, no token');
  }

  if(!process.env.JWT_SECRET){
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById((decoded as JwtPayload).userId).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, token failed');
  }
  
});

export { protect };