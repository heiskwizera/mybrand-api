import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blogId: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

export default new mongoose.model('Comment', commentSchema);