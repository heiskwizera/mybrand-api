import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date :{
        type:Date,
        default:Date.now,
    }

})

export default new mongoose.model('Blog',blogSchema);