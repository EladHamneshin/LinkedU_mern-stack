import UserModel from "../models/userModel.js";
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { comparePassword } from '../utils/encryptPassword.js';



const authUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);

    if (!user)
        throw new RequestError('Invalid email', STATUS_CODES.UNAUTHORIZED);

    if (!await comparePassword(password, user.password))
        throw new RequestError('Invalid password', STATUS_CODES.UNAUTHORIZED);
    return user;
}

const getUserByEmail = async (userEmail: string) => {
    return await UserModel.findOne({ email: userEmail });
}

export { authUser };