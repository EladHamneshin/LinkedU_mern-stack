import User from '../types/User.js';
import UserModel from '../models/userModel.js';
import RequestError from '../utils/RequestError.js';
import STATUS_CODES from '../utils/StatusCodes.js';
import {comparePassword, hashPassword } from '../utils/encryptPassword.js';



export const addUser = async (user: User) => {
    const { name, email, password } = user;
    const userExists = await UserModel.findOne({ email });

    if (userExists) 
        throw new RequestError('User already exists', STATUS_CODES.BAD_REQUEST);

    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    if (!newUser) 
        throw new RequestError('Invalid user data', STATUS_CODES.BAD_REQUEST);
    return newUser;
}

export const authUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email);

    if(!user)
        throw new RequestError('Invalid email', STATUS_CODES.UNAUTHORIZED);
    
    if(!await comparePassword(password, user.password))
        throw new RequestError('Invalid password', STATUS_CODES.UNAUTHORIZED);
    return user;
}

const getUserByEmail = async (userEmail: string) => {
    return await UserModel.findOne({ email: userEmail });
}
