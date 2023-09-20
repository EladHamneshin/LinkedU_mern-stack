import User from '../types/User.js';
import UserModel from '../models/userModel.js';
import RequestError from '../utils/RequestError.js';
import STATUS_CODES from '../utils/StatusCodes.js';
import { hashPassword } from '../utils/encryptionUtils.js';



export const addUser = async (user: User) => {
    const { name, email, password } = user;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        throw new RequestError('User already exists', STATUS_CODES.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    if (newUser) {
        return newUser;
    } else {
        throw new RequestError('Invalid user data', STATUS_CODES.BAD_REQUEST);
    }
}

export const getUserByEmail = async (userEmail: string) => {
    
}

