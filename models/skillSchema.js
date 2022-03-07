import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
});

export default new mongoose.model('skill',skillSchema);