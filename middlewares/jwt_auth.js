import jwt from 'jsonwebtoken';
import 'dotenv/config';
function auth (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token,JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send(`Invalid token : ${error}`)
    }
    
}

export const jwtauth = auth;