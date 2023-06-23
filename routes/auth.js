const express = require("express");

const User = require("../model/user");

const bcryptjs = require('bcryptjs');

const jsonwebToken = require("jsonwebtoken");

const appRouter = express.Router();


appRouter.post("/api/signup", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                msg: "user already register this email"
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);



        let user = User({
            email,
            password: hashPassword,
            name
        });

        user = await user.save();


        res.status(200).json({ status_code: 200, message: "Signup successfully", user: user });


        //res.json(user);





    } catch (e) {


        res.status(500).json({ error: e.message });

    }
});



 appRouter.post("/api/signin",async(req,res)=>{

   try {

    const {email,password} = req.body;

     const user = await User.findOne({email});

     if(!user){
        res.status(400).json({msg: "user does not found"});
     }

     const isMatch =  await bcryptjs.compare(password,user.password);

      if(!isMatch){
        res.status(400).json({msg: "Password Incorrect"});
      }


      const token = jsonwebToken.sign({id: user._id},"secretKey");

      res.json({token,...user._doc});





    
   } catch (error) {
      console.log(error.message);
   }

 });


module.exports = appRouter;


