import request from 'supertest';
import server from '../../index';
import { signature } from '../../helpers/auth.helper';
import mongoose from 'mongoose'
import skillSchema from '../../models/skillSchema';

describe('Skills End points', () => {

    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    describe('CREATE', () => {
        it("Should create new skill", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server)
                .post("/api/skill/create")
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ skill: 'JavaTest', percentage: '22' });
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('CREATE', () => {
        it("Should require all fields", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server)
                .post("/api/skill/create")
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ percentage: 54 });
            expect(res.statusCode).toBe(500);
        }, 50000);
    });

    describe('GET ALL', () => {
        it('Should fetch all skills', async () => {
            const res = await request(server).get('/api/skill/all');
            expect(res.status).toBe(201);
        }, 50000);
    });

    describe('GET SINGLE', () => {
        it('FETCH Single Skill', async () => {
            const obj = new skillSchema();
            const res = await request(server).get('/api/skill/' + obj._id + '/view');
            expect(res.status).toBe(201);
        }, 50000)
    });

    describe('GET SINGLE', () => {
        it('Should catch error when invalid skillID is looked up', async () => {
            const res = await request(server).get('/api/skill/Fakeid/view');
            expect(res.status).toBe(404);
        }, 50000)
    });

    describe('UPDATE', () => {
        it("UPDATING SKILL", async () => {
            const skill = new skillSchema();
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)

                .put(`/api/skill/` + skill._id + '/update')
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(201);
        }, 50000);
    });


    describe('UPDATE', () => {
        it("Should not update a not found skill", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .put(`/api/skill/` + 'FakeId' + '/update')
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(400);
        }, 50000);
    });

    describe('DELETE', () => {
        it("Should delete skill", async () => {
            const skill = new skillSchema();
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .delete(`/api/skill/delete/${skill._id}`)
                .set("x-auth-token", signature.generateAdminSignature(payload));
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('DELETE', () => {
        it("Should not delete a not found skill", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .delete(`/api/skill/delete/FakeId`)
                .set("x-auth-token", signature.generateAdminSignature(payload));
            expect(res.statusCode).toBe(400);
        }, 50000);
    });
















})