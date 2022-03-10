import _ from "lodash";
import bcrypt from "bcrypt";


import userSchema from "../models/userSchema.js";

const addUser = async (req,res) =>{
    try {

        // User exist?
        let user = await userSchema.findOne({email: req.body.email})
        if(user) return res.status(400).send("User already exist");

        // Else encrypt password and save one
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        user = new userSchema(_.pick(req.body,['_id','name','email','password']));
        await user.save();

        // Set response header and return saved user
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','password']));
        
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

const SignedUser = async(req,res)=>{
    try {
        const getUser = await userSchema.findById(req.user._id)
        res.status(200).json({
            message:`Welcome ${req.user._id}`,
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

export const userCRUD = {addUser,fetchUser,SignedUser,fetchUsers,updateUser,deleteUser}