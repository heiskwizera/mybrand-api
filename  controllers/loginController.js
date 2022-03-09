import loggerSchema from "../models/loginSchema.js";

export const loginAttempt = async(req,res)=>{
    try{
          // User exist?
          let existingUser = await loggerSchema.findOne({email: req.body.email})
          if(!existingUser) return res.status(400).send("Invalid email or password");
         
          const validPassword = await  bcrypt.compare(req.body.password,existingUser.password);
          if(!validPassword) return res.status(400).send("Invalid email or password");

          res.status(200).json({
              message:`Welcome ${existingUser.name}`

          })

        
    } catch (error) {
        res.status(400).json({
            message:`Auth error : ${error}`
        })
        
    }
}
