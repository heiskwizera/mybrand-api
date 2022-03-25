import userSchema from "../models/userSchema.js";
import bcrypt from 'bcrypt'

export const loginAttempt = async (req, res) => {
  try {
    let error = '';
    // User exist?
    let existingUser = await userSchema.findOne({ email: req.body.email })
    if (!existingUser) throw error = 'Invalid Email or password'
    //  Valid password?
    const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
    if (!validPassword) throw error = 'Invalid Email or password'

    //   yes set headers for user
    const token = existingUser.generateAuthToken();
    res.header('x-auth-token', token).status(201).json({
      message: `Welcome ${existingUser.name}`
    })

  } catch (error) {
    res.status(400).json({
      response: `Bad request error : ${error}`
    })

  }
}
