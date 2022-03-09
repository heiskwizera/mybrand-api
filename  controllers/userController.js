import userSchema from "../models/userSchema.js";
import _ from 'lodash';
import bcrypt from 'bcrypt';

const addUser = async (req,res) =>{
    try {

        // User exist?
        let existingUser = await userSchema.findOne({email: req.body.email})
        if(existingUser) return res.status(400).send("User already exist");
        // Else add one

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password,salt);

        const newUser = await userSchema.create({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        })
        res.status(200).send(_.pick(newUser,['_id','name','email','password']));
        
    } catch (error) {
        res.status(400).json({
            message:`Bad request : ${error}`
        })
    }
}

const fetchUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const getUser = await userSchema.findById(userId)
        res.status(200).json({
            message:'Retrieved user',
            user : getUser
        })
        
    } catch (error) {
        res.status(400).json({
            message:`Bad request : ${error}`
        })
    }
}

const fetchUsers = async(req,res)=>{
    try {
        const getUsers = await userSchema.find({})
        res.status(200).json({
            message:'Retrieved users',
            users : getUsers
        })
    } catch (error) {
        res.status(400).json({
            message:`Bad request : ${error}`
        })
    }
}

const updateUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const changes = await userSchema.findByIdAndUpdate(userId, req.body,{new:true});
        res.status(200).json({
            message : `Updated user`,
            updated : changes
        })
    } catch (error) {
        res.status(400).json({
            message : `Bad request : ${error}`
        })
    }
}

const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const deleted = await userSchema.findByIdAndRemove(userId)
        res.status(200).json({
            message:'Removed a user',
            user : deleted
        })
        
    } catch (error) {
        res.status(400).json({
            message:`Bad request ${error}`
        })
    }
}

export const userCRUD = {addUser,fetchUser,fetchUsers,updateUser,deleteUser}