import request from 'supertest';
import server from '../../index';
import messageSchema from '../../models/messageSchema';
import { signature } from '../../helpers/auth.helper';
import mongoose from 'mongoose'

describe('MESSAGES End points', () => {

    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    describe('SEND MESSAGE', () => {
        it("Should create new message", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .post("/api/message/create")
                .set("x-auth-token", signature.generateUserSignature(payload))
                .send({ name: 'lolo', email: 'email@test.rw', subject: 'message-IN-TESTING', message: 'i love coding' })
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('SEND MESSAGE', () => {
        it("Should catch error when missing field", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .post("/api/message/create")
                .set("x-auth-token", signature.generateUserSignature(payload))
                .send({ email: 'email@test.rw', subject: 'message-IN-TESTING', message: 'i love coding' })
            expect(res.statusCode).toBe(500);
        }, 50000);
    });

    describe('GET SINGLE', () => {
        it('Should return single message', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const obj = new messageSchema();

            const res = await request(server).get('/api/message/view/' + obj._id)
                .set('x-auth-token', signature.generateAdminSignature(payload))

            expect(res.status).toBe(201);

        }, 50000)
    });

    describe('GET SINGLE', () => {
        it('Should not return blog when passed invalid id', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server).get('/api/message/view/' + 'FakeId')
                .set('x-auth-token', signature.generateAdminSignature(payload))

            expect(res.status).toBe(400);

        }, 50000)
    });

    describe('GET ALL', () => {
        it('FETCH ALL MESSAGES', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server).get('/api/message/all')
                .set('x-auth-token', signature.generateAdminSignature(payload))
            expect(res.status).toBe(201);

        }, 50000);
    });
    describe('DELETE MESSAGE', () => {
        it("Should delete message", async () => {
            const message = new messageSchema();
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .delete(`/api/message/delete/${message._id}`)
                .set("x-auth-token", signature.generateAdminSignature(payload));
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('DELETE MESSAGE', () => {
        it("Should Not delete not found message", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .delete(`/api/message/delete/fakeId`)
                .set("x-auth-token", signature.generateAdminSignature(payload));
            expect(res.statusCode).toBe(400);
        }, 50000);
    });












})