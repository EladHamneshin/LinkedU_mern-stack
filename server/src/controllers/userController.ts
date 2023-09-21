import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import * as service from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import { Request, Response } from "express";
import RequestError from "../utils/RequestError.js";
import userValidation from "../utils/validations/userValidation.js";
import authValidation from "../utils/validations/authValidations.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {

  const { error } = authValidation(req.body);
  if (error?.details[0].message) 
    throw new RequestError(error?.details[0].message, STATUS_CODES.BAD_REQUEST);

  const { email, password } = req.body;
  const user = await service.authUser(email, password);

  generateToken(res, user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {

  const { error } = userValidation(req.body);
  if (error?.details[0].message) 
    throw new RequestError(error?.details[0].message, STATUS_CODES.BAD_REQUEST);

  const user = await service.addUser(req.body);

  res.status(STATUS_CODES.CREATED).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(STATUS_CODES.OK).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await service.getUserById(req.userId);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await service.updatedUser(req.userId, req.body);;

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email
  });
 
});

export { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile };