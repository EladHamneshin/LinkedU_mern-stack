import request from 'supertest';
import { app } from '../server.js';
import STATUS_CODES from '../utils/StatusCodes.js';

const login =async () => {
    let response = await request(app).post('/api/users/auth/login').send({
        email: 'test1@test.com',
        password: 'Test#!123'
    }).expect(STATUS_CODES.OK).expect('set-cookie', /jwt/);
    const token = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    return token;
}

const logout = async (token: string) => {
    await request(app).post('/api/users/auth/logout').set('Cookie', `jwt=${token}`).expect(STATUS_CODES.OK);
}

describe('app rest api test',async () => {
    // Register tests
    describe('POST /api/users', () => {
        it('Register a new user', async () => {
            await request(app).post('/api/users').send({
                name: 'test4',
                email: 'test4@test.com',
                password: 'Test#!123'
            }).expect(STATUS_CODES.CREATED);
        });

        it('Register an existing user', async () => {
            await request(app).post('/api/users').send({
                name: 'test1',
                email: 'test1@test.com',
                password: 'Test#!123'
            })
            .expect(STATUS_CODES.BAD_REQUEST);
        });

        it('Register a user with an invalid email', async () => {
            await request(app).post('/api/users').send({
                name: 'test5',
                email: 'test5',
                password: 'Test#!123'
            }).expect(STATUS_CODES.BAD_REQUEST);
        });

        it('Register a user with an invalid password', async () => {
            await request(app).post('/api/users').send({
                name: 'test5',
                email: 'test5@test.com',
                password: 'Test'
            }).expect(STATUS_CODES.BAD_REQUEST);
        });
    });

    // Login tests
    describe('POST /api/users/auth/login', () => {
        it('Login with an existing user', async () => {
            const token = await login();
            await logout(token);
        });

        it('Login with a non-existing user', async () => {
            await request(app).post('/api/users/auth/login').send({
                email: 'test5@test.com',
                password: 'Test#!123'
            }).expect(STATUS_CODES.UNAUTHORIZED);
        });
    });

    describe('POST /api/users/auth/logout', () => {
        it('Logout with a valid token', async () => {
            const token = await login();
            await logout(token);
        });
    });

    describe('connected tests' , () => {
        let token: string;    

        beforeAll(async () => {
            token = await login();
        });

        afterAll(async () => {
            await logout(token)
        });

        // Get user tests
        describe('GET /api/user/profile', () => { 
            it('Get user with a valid token', async () => {
                await request(app).get('/api/users/profile').set('Cookie', `jwt=${token}`).expect(STATUS_CODES.OK);
            });

            it('Get user with an invalid token', async () => {
                await request(app).get('/api/users/profile')
                .set('Cookie', 'jwt=invalid').expect(STATUS_CODES.UNAUTHORIZED);
            });
        });

        // Update user tests
        describe('PUT /api/user/profile', () => {
            it('Update user with a valid token', async () => {
                await request(app).put('/api/users/profile').set('Cookie', `jwt=${token}`).send({
                    name: 'test2',
                    email: 'test22@test.com'}).expect(STATUS_CODES.OK)
            });

            it('Update user with an invalid token', async () => {
                await request(app).put('/api/users/profile')
                .set('Cookie', 'jwt=invalid').expect(STATUS_CODES.UNAUTHORIZED);
            });
        });
    });
});