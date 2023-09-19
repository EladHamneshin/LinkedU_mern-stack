import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import STATUS_CODES from '../utils/StatusCodes.js';
import * as service from '../services/userService.js';


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


export {
  registerUser,
};