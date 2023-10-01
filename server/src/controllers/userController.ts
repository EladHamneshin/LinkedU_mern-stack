import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../types/errors/RequestError.js";
import * as userService from "../services/userService.js";
import userValidation from "../utils/validations/userValidation.js";


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {

  const { error } = userValidation(req.body);
  if (error)
    throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);

  const user = await userService.addUser(req.body);

  res.status(STATUS_CODES.CREATED).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUser(req.userId);

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
  const updatedUser = await userService.updatedUser(req.userId, req.body);;

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email
  });

});

export { registerUser, getUserProfile, updateUserProfile };