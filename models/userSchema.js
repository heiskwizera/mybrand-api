import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import config from '../config.js';

const { secret } = config;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, secret);
    return token;
}

export default new mongoose.model('user', userSchema);
