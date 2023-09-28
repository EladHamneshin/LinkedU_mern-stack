import { afterAll, beforeAll } from "vitest";
import { hashPassword } from "../utils/encryptPassword.js";
import UserModel from "../models/userModel.js";

// Insert two users before all tests
beforeAll(async () => {
    const hashedPassword = await hashPassword('Test#!123');
    const fakeData = 
    [{
        name: 'test1',
        email: 'test1@test.com',
        password: hashedPassword
    }, 
    {
        name: 'test2',
        email: 'test2@test.com',
        password: hashedPassword
    },
    {
        name: 'test3',
        email: 'test3@test.com',
        password: hashedPassword
    }]

    for (const data of fakeData) {
        const user = new UserModel(data);
        await user.save();
    }
});

// Delete all users after all tests
afterAll(async () => {
    await UserModel.deleteMany({});
});