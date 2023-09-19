import User from '../types/User.js';
import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import RequestError from '../utils/RequestError.js';
import STATUS_CODES from '../utils/StatusCodes.js';


async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}

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
        //generateToken(res, user._id);

        return newUser;
    } else {
        throw new RequestError('Invalid user data', STATUS_CODES.BAD_REQUEST);
    }
}

