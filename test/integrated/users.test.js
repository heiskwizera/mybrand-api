import request from 'supertest';
import server from '../../index';
import { createEmail } from '../../helpers/email.generator';
import userSchema from '../../models/userSchema';
import mongoose from 'mongoose';
import { signature } from '../../helpers/auth.helper';


describe("USER END POINT-TEST", () => {
    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    const email = createEmail(6) + "@domain.com";

    it("should allow authorized user to login", async () => {
        const res = await request(server)
            .post("/api/login")
            .send({
                email: "user1@yahoo.com",
                password: "user1.password"
            });
        expect(res.statusCode).toBe(201);
    }, 50000);


    it("should limit unauthorized user to login", async () => {
        const res = await request(server)
            .post("/api/login")
            .send({
                email: "x@yahoo.com",
                password: "x.password"
            });
        expect(res.statusCode).toBe(400);
    }, 50000);


    it("It should register the user", async () => {
        const res = await request(server)
            .post("/api/user/create")
            .send({ name: 'userTest', email: email, password: 'Password12@' });
        expect(res.statusCode).toBe(201);
    }, 50000)


    it("Should not register an existing user", async () => {
        const user = new userSchema();
        const res = await request(server)
            .post("/api/user/create")
            .send({ name: user.user, email: user.email, password: 'Password12@' });
        expect(res.statusCode).toBe(400);
    }, 50000)


    it('Should retrieve user', async () => {
        const payload = { _id: new mongoose.Types.ObjectId() };
        const obj = new userSchema();
        const res = await request(server).get('/api/user/view/' + obj._id)
            .set('x-auth-token', signature.generateAdminSignature(payload));
        expect(res.status).toBe(201);

    }, 50000)

    it('Should not retrieve user', async () => {
        const payload = { _id: new mongoose.Types.ObjectId() };
        const res = await request(server).get('/api/user/view/' + 'FakeId')
            .set('x-auth-token', signature.generateAdminSignature(payload));
        expect(res.status).toBe(400);

    }, 50000)

    it('Should fetch all users', async () => {
        const payload = { _id: new mongoose.Types.ObjectId() };
        const res = await request(server).get('/api/user/all')
            .set('x-auth-token', signature.generateUserSignature(payload))
        expect(res.status).toBe(201);
    }, 50000);

    it("Should delete user", async () => {
        const user = new userSchema();
        const payload = { _id: new mongoose.Types.ObjectId() };
        const res = await request(server)
            .delete(`/api/user/delete/${user._id}`)
            .set("x-auth-token", signature.generateUserSignature(payload));
        expect(res.statusCode).toBe(201);
    }, 50000);

});