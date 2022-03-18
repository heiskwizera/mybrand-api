import config from '../../../config.js';
import userSchema from '../../../models/userSchema';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
const { secret } = config;

describe('Generate Auth Token', () => {
    it('should return a valid JsonWebToken', () => {
        const payload = { _id: new mongoose.Types.ObjectId() };
        const user = new userSchema(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, secret);
        expect(decoded).toMatchObject(payload)
    });

});

