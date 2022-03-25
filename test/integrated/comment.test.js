import request from 'supertest';
import server from '../../index';
import mongoose from 'mongoose';
import { signature } from '../../helpers/auth.helper';
import blogSchema from '../../models/blogSchema'
import commentSchema from '../../models/commentSchema'

describe('COMMENT END POINTS', () => {

    beforeEach(() => {
        { server };
    })
    afterEach(() => {
        { server.close(); }
    })

    describe('FETCH COMMENTS', () => {
        it('Should fetch comments on blog', async () => {
            const obj = new blogSchema();
            const res = await request(server).get('/api/comment/blog/' + obj._id + '/view');
            expect(res.status).toBe(201);

        }, 50000);
    });

    describe('FETCH COMMENTS', () => {
        it('Fail to fetch comments', async () => {
            const res = await request(server).get('/api/comment/blog/' + 'FakeId' + '/view');
            expect(res.status).toBe(400);
        }, 50000);
    });



    describe('CREATE COMMENTS', () => {
        it('Should be created by authorized user', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const obj = new blogSchema();
            const res = await request(server).post('/api/comment/blog/' + obj._id + '/create')
                .set("x-auth-token", signature.generateUserSignature(payload))
                .send({ author: 'testUser', comment: "is it working", blogId: obj._id })
            expect(res.status).toBe(201);

        }, 50000);
    });



    describe('CREATE COMMENTS', () => {

        it('Should not create when missing parameter', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const obj = new blogSchema();
            const res = await request(server).post('/api/comment/blog/' + obj._id + '/create')
                .set("x-auth-token", signature.generateUserSignature(payload))
                .send({ comment: "is it working", blogId: obj._id })
            expect(res.status).toBe(500);
        }, 50000);
    });

    describe('DELETE COMMENT', () => {
        it('Should delete comment', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const obj = new commentSchema();
            const res = await request(server).delete('/api/comment/blog/' + obj._id + '/delete')
                .set("x-auth-token", signature.generateUserSignature(payload));
            expect(res.status).toBe(201);
        }, 50000);
    });

    describe('DELETE COMMENT', () => {
        it('Fail to delete a comment', async () => {
            const payload = { _id: new mongoose.Types.ObjectId() };
            const res = await request(server).delete('/api/comment/blog/' + 'FakeId' + '/delete')
                .set("x-auth-token", signature.generateUserSignature(payload));
            expect(res.status).toBe(400);
        }, 50000);
    });



});

