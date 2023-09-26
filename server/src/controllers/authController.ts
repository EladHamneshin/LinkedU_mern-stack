import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import STATUS_CODES from "../utils/StatusCodes.js";
import RequestError from "../utils/RequestError.js";
import generateToken from "../utils/generateToken.js";
import * as authService from "../services/authService.js";
import authValidation from "../utils/validations/authValidations.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const { error } = authValidation(req.body);
    if (error?.details[0].message)
        throw new RequestError(error?.details[0].message, STATUS_CODES.BAD_REQUEST);

    const { email, password } = req.body;
    const user = await authService.authUser(email, password);

    generateToken(res, user._id);

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

export { authUser };
