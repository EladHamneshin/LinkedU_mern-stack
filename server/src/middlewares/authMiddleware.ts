import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import STATUS_CODES from '../utils/StatusCodes.js';

const authHandler = asyncHandler( async (req, res, next) => {
  const token = req.cookies.jwt;
  const currrentUserId = req.body.userId;
  let decoded;

  if (!token) {
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, no token');
  }

  if(!process.env.JWT_SECRET){
    console.error('JWT_SECRET not defined');
    process.exit(1);
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, token failed');
  }

  // if the id in the token does not match the id in the request body
  if(currrentUserId !== (decoded as JwtPayload).userId){
    res.status(STATUS_CODES.UNAUTHORIZED);
    throw new Error('Not authorized, token id and user id do not match');
  }
       
  next(); 
});

export { authHandler };