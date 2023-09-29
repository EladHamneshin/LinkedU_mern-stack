import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../utils/RequestError.js";
import generateToken from "../utils/generateToken.js";
import * as authService from "../services/authService.js";
import authValidation from "../utils/validations/authValidations.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { error } = authValidation(req.body);
    if (error)
        throw new RequestError(error.message, STATUS_CODES.BAD_REQUEST);

    if (req.cookies.jwt) {
        throw new RequestError('User already logged in', STATUS_CODES.BAD_REQUEST);
    }

    const { email, password } = req.body;
    const user = await authService.authUser(email, password);

    generateToken(res, user._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/auth/logout
// @access  Public
const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(STATUS_CODES.OK).json({ message: 'Logged out successfully' });
  };

export { loginUser, logoutUser };
