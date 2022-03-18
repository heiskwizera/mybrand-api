import mongoose from 'mongoose';
import express from 'express';
import config from './config.js';
import helmet from "helmet";
import compression from "compression";


const app = express();
const { port } = config;
const { secret } = config;
const { db } = config;

import { comments } from './routes/comments.js';
import { home } from './routes/home.js';
import { blogs } from './routes/blogs.js';
import { messages } from './routes/messages.js';
import { skills } from './routes/skills.js';
import { users } from './routes/users.js';
import { admin } from './routes/login.js';




// Checking the token
if (!secret) {
    console.log('FATAL ERROR : JwtPrivateKey is not defined');
    process.exit(1);
}

// Implementing db connection
mongoose.connect(db)
    .then(() => console.log(' 🥭 Database is Connected 🔥 '))
    .catch(err => console.log('Failed', err));

// Middleware return req.body in json format
app.use(express.json())
app.use(helmet());
app.use(compression());

app.use('/', home);
app.use('/api/blog', blogs);
app.use('/api/message', messages);
app.use('/api/skill', skills);
app.use('/api/user', users);
app.use('/api/login', admin);
app.use('/api/comment/blog', comments);


// Building web server
const server = app.listen(port, () =>
    console.log(`APP ON PORT ${port}, initializing db...`)
);

export default server;
