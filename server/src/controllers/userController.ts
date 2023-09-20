import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import * as service from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import { Request, Response } from "express";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
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
  const { name, email, password } = req.body;
  const user = await service.addUser({ name, email, password });

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

export { registerUser, authUser, logoutUser };