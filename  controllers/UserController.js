import _ from "lodash";
import bcrypt from "bcrypt";


import userSchema from "../models/userSchema.js";

const addUser = async (req, res) => {
    try {
        let error = '';
        // User exist?
        let user = await userSchema.findOne({ email: req.body.email })
        if (user) throw error = `Email ${req.body.email} already exist`

        // Else encrypt password and save one
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user = new userSchema(_.pick(req.body, ['_id', 'name', 'email', 'password', 'isAdmin']));
        await user.save();

        res.status(201).json({
            response: `User ${req.body.name} was added successfully `
        })

        // res.header('x-auth-token', token);

    } catch (error) {
        res.status(400).json({
            response: `Bad request : ${error}`
        })
    }
}

const fetchUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const getUser = await userSchema.findById(userId)
        res.status(201).json({
            response: 'Retrieved user',
            user: getUser
        })


    } catch (error) {
        res.status(400).json({
            response: `Bad request : ${error}`
        })
    }
}

const SignedUser = async (req, res) => {
    try {
        const getUser = await userSchema.findById(req.user._id).select('-password');
        res.status(201).json({
            response: `Welcome ${getUser.name}`,
            user: getUser
        })


    } catch (error) {
        res.status(400).json({
            response: `Bad request : ${error}`
        })
    }
}





const fetchUsers = async (req, res) => {
    try {
        const getUsers = await userSchema.find({})
        res.status(201).json({
            response: 'Retrieved users',
            users: getUsers
        })
    } catch (error) {
        res.status(400).json({
            response: `Bad request : ${error}`
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const changes = await userSchema.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(201).json({
            response: `Updated user`,
            updated: changes
        })
    } catch (error) {
        res.status(400).json({
            response: `Bad request : ${error}`
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await userSchema.findByIdAndRemove(userId)
        res.status(201).json({
            response: 'Removed a user',
            user: '...'
        })

    } catch (error) {
        res.status(400).json({
            response: `Bad request ${error}`
        })
    }
}

export const userCRUD = { addUser, fetchUser, SignedUser, fetchUsers, updateUser, deleteUser }