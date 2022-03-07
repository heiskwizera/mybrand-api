import userSchema from "../models/userSchema.js";

const addUser = async (req,res) =>{
    try {
        const newUser = await userSchema.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        res.status(200).json({
            message:"Added a user",
            result:newUser
        })
        
    } catch (error) {
        res.status(400).json({
            message:`Bad request : ${error}`
        })
    }
}

const fetchUser = async(req,res)=>{
    try {
        const getUser = await userSchema.findById(id)
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
        const getUsers = await userSchema.findById({})
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