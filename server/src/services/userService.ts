import User from '../types/User.js';
import UserModel from '../models/userModel.js';
import RequestError from '../utils/RequestError.js';
import STATUS_CODES from '../utils/StatusCodes.js';
import { hashPassword } from '../utils/encryptPassword.js';
import { Types } from 'mongoose';

const addUser = async (user: User) => {
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


const getUser = async (userId: Types.ObjectId) => {
	const user = await UserModel.findById(userId);
	if(!user)
		throw new RequestError('User not found', STATUS_CODES.NOT_FOUND);
	return user;
}

const updatedUser = async (id: Types.ObjectId , userDetails: Partial<User>) => {
	const userToUpdate = await UserModel.findById(id);

	if(!userToUpdate)
		throw new RequestError('User not found', STATUS_CODES.NOT_FOUND);

	userToUpdate.name = userDetails.name || userToUpdate.name;
	userToUpdate.email = userDetails.email || userToUpdate.email;

	if (userDetails.password) 
		userToUpdate.password = await hashPassword(userDetails.password);
	
	return await userToUpdate.save();
}


export {addUser, getUser, updatedUser}
