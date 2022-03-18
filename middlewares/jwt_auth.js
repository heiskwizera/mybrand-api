import jwt from 'jsonwebtoken';
import config from '../config.js';

const { secret } = config;

function validToken(req, res, next) {

    // Defining token
    const token = req.header('x-auth-token');

    // Condition to identifying token
    if (!token) return res.status(401).json({
        response: '⚠️ Access denied. No token provided'
    });

    try {
        // Verifying the token string value against secret key
        const decodedObject = jwt.verify(token, secret);
        req.user = decodedObject;
        next();
    } catch (error) {
        res.status(400).json({
            response: `Invalid token : ${error}`
        })
    }

}

export const auth = validToken;