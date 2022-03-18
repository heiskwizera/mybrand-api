import request from 'supertest';
import server from '../../index';
import blogSchema from '../../models/blogSchema'
import { signature } from '../../helpers/auth.helper';
import mongoose from 'mongoose'
import userSchema from '../../models/userSchema';

describe('BLOGS End points', () => {
    let id;

    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    describe('GET ALL', () => {
        it('FETCH ALL BLOGS', async () => {
            const res = await request(server).get('/api/blog/all');
            expect(res.status).toBe(201);

        }, 50000);
    });

    describe('GET ALL', () => {
        it('FETCH ALL BLOGS', async () => {
            const res = await request(server).get('/api/blog/all');
            expect(res.status).toBe(201);

        }, 50000);
    });

    describe('GET SINGLE', () => {
        it('FETCH SINGLE BLOG', async () => {

            const obj = new blogSchema();

            const res = await request(server).get('/api/blog/view/' + obj._id);
            expect(res.status).toBe(201);

        }, 50000)
    });

    describe('CREATE', () => {
        it("ADD NEW BLOG", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server)
                .post("/api/blog/create")
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('FORBIDDEN RESOURCE', () => {
        it("FORBIDDEN TO CREATE WHEN INVALID TOKEN", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server)
                .post("/api/blog/create")
                .set("x-auth-tokenn", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(401);
        }, 50000);
    });

    describe('ERROR WHEN MISSING PARAMETER', () => {
        it("CANNOT CREATE WHEN MISSING FIELD", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };

            const res = await request(server)
                .post("/api/blog/create")
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send();
            expect(res.statusCode).toBe(400);
        }, 50000);
    });

    describe('UPDATE', () => {
        it("UPDATING BLOG", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .put(`/api/blog/update/62307a6df5c0041df3e57f5f`)
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(201);
        }, 50000);
    });

    describe('UPDATE', () => {
        it("Should not update Blog", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .put(`/api/blog/update/FakeId`)
                .set("x-auth-token", signature.generateAdminSignature(payload))
                .send({ title: 'Blog-01', content: "Blog-0101", description: 'Blog-IN-TESTING' });
            expect(res.statusCode).toBe(400);
        }, 50000);
    });
    describe('DELETE', () => {
        it("Should DELETE Blog", async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server)
                .delete(`/api/blog/delete/id`)
                .set("x-auth-token", signature.generateAdminSignature({ id: 1 }));
            expect(res.statusCode).toBe(201);
        }, 50000);
    });


























});