import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import STATUS_CODES from '../utils/StatusCodes.js';

const authHandler = asyncHandler( async (req, res, next) => {
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
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, token failed');
  }
  
});

export { authHandler };