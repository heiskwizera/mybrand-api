import userSchema from "../models/userSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const loginAttempt = async(req,res)=>{
    try{
          // User exist?
          let existingUser = await userSchema.findOne({email: req.body.email})
          if(!existingUser) return res.status(400).send("Invalid email or password");
        //  Valid password?
          const validPassword = await bcrypt.compare(req.body.password,existingUser.password);
          if(!validPassword) return res.status(400).send("Invalid email or password");

          const token = jwt.sign({_id:existingUser._id},process.env.JWT_TOKEN);
          res.send(token);

        //   res.status(200).json({
        //       message:`Welcome ${existingUser.name}`
        //   })

        
    } catch (error) {
        res.status(400).json({
            message:`Auth error : ${error}`
        })
        
    }
}
