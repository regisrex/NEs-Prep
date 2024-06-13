import request from 'supertest';
import { describe, expect, it } from 'vitest';
import bootStrap from '../../api';


const TESTING_CREDS = {
    fullNames: "Tester tester",
    email: "tester@gmail.com",
    phone: "0788899977",
    password: "password@123",
    confirmPassword: "password@123"
}

describe('Auth module tests', () => {
    /**  */
    // it("Creates a new admin", async (done) => {
    //     const { app, killServer } = await bootStrap()
    //     await request(app)
    //         .post('/api/v1/auth/create-admin')
    //         .send({
    //             fullNames: TESTING_CREDS.fullNames,
    //             email: TESTING_CREDS.email,
    //             phone: TESTING_CREDS.phone,
    //             password: TESTING_CREDS.password,
    //             confirmPassword: TESTING_CREDS.confirmPassword
    //         }).then((response) => {
    //             expect(response.ok).toBeTruthy()
    //             expect(Object.keys(response.body['data'])).toContain("token")
    //         })
    // }, 50000)

    it("Logs in an admin", async (done) => {
        const { app, killServer} = await bootStrap()
        await request(app)
            .post('/api/v1/auth/login')
            .send({
                identifier: TESTING_CREDS.email,
                password: TESTING_CREDS.password,
            }).then((response) => {
                expect(response.ok).toBeTruthy()
                expect(Object.keys(response.body['data'])).toContain("token")
                expect(response.body['success']).toBeTruthy()
            })
    }, 50000)

})