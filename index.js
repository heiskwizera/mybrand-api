import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express';
const app = express();

import {home} from './routes/home.js';
import {blogs} from './routes/blogs.js';
import { messages } from './routes/messages.js';
import { skills } from './routes/skills.js';
import {users} from './routes/users.js';
import {admin} from './routes/login.js';
app.use(express.json()) // Middleware return req.body in json format
app.use('/',home);
app.use('/api/blogs',blogs);
app.use('/api/messages',messages);
app.use('/api/skills',skills);
app.use('/api/users',users);
app.use('/login',admin);


// Building web server
app.listen(process.env.PORT, () =>
    console.log(`Listening to port ${process.env.PORT}`)
);

// Testing db connection

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log('Connected'))
.catch(err=>console.log('Failed',err));



