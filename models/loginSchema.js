import mongoose from 'mongoose';

const loggerSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
export default new mongoose.model('Login',loggerSchema);