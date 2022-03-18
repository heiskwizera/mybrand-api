import jwt from 'jsonwebtoken';
import config from '../config';

const { secret } = config;

const generateAdminSignature = (payload) => {
    const token = jwt.sign({ payload, isAdmin: true }, secret);
    return token;
};

const generateUserSignature = (payload) => {
    const token = jwt.sign({ payload }, secret);
    return token;
};

export const signature = { generateAdminSignature, generateUserSignature };