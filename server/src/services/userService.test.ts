import { afterAll, beforeAll, describe, expect, test } from "vitest";
import * as userService from "./userService.js";
import { Types } from "mongoose";
import {connectDB, disconnectDB} from "../configs/db.js";
import dotenv from 'dotenv';
dotenv.config();

let userId: Types.ObjectId;
const user = {
    name: 'test',
    email: 'test@test.com',
    password: 'Test#!123'
};


describe('userService', () => {

/* Connecting to the database before each test. */
beforeAll(async () => {
    await connectDB();
 });
   
 /* Closing database connection after each test. */
 afterAll(async () => {
     await disconnectDB();
 });

describe('addUser', () => {
    test('add user to user collection', async () => {
        const newUser = await userService.addUser(user);
        expect(newUser).toBeDefined();
        expect(newUser._id).toBeDefined();
        expect(newUser.name).toBe(user.name);
        expect(newUser.email).toBe(user.email);
        userId = newUser._id;
    }
    );

    test('add user to user collection with existing email', async () => {
        expect(userService.addUser(user)).rejects.toThrow('Email already exists');
    })
});

// describe('getUser', () => {
//     test('get user from user collection', async () => {
//         const returnUser = await userService.getUser(userId);
//         expect(returnUser).toBeDefined();
//         expect(returnUser._id).toBeDefined();
//         userId = returnUser._id;
//         expect(returnUser.name).toBe(user.name);
//         expect(returnUser.email).toBe(user.email);
//     }
//     );

//     test('get user from user collection with non-existing id', async () => {
//         expect(userService.getUser(new Types.ObjectId("i78t6776tufgvhghdcnfgdfgnxndgxdf"))).rejects.toThrowError('User not found');
//     })
// });

describe('updateUser', () => {
    test('update user from user collection', async () => {
        const returnUser = await userService.updatedUser(userId, { name: 'test1', email: 'test1@test.com'});
        expect(returnUser).toBeDefined();
        expect(returnUser._id).toBeDefined();
        userId = returnUser._id;
        expect(returnUser.name).toBe('test1');
        expect(returnUser.email).toBe('test1@test.com');
    })
});

// describe('deleteUser', () => {
//     test('delete user from user collection', async () => {
     
// })});
});