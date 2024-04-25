const {randomString} = require("../utils/Common")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin=require("../models/Admin.js")
const Verification=require("../models/Verification.js")
const config=require("config")

const register=async(req,res,next)=>{
   const {name,email,password}=req.body;
   console.log("here")
   if(!name||!email||!password){
     res.status(400).json({message:"Please fill all the fields"});
   }
   try{
      let user=await Admin.findOne({email:email});

      if(user){
         res.status(422).json({message:"Email is already registered"})
      }

      let newUser=new Admin({
         name,
         email,
         password,
      })

      const hash=await bcrypt.genSalt(10);
      newUser.password=await bcrypt.hash(password,hash);

      await newUser.save();
    
      let verification=new Verification({
        token:randomString(50),
        userId:newUser._id,
        type:"Register New Account",
      })

      await verification.save();

    //   res.status(201).json(
    //     success("Register success",{
    //         user:{
    //             id:newUser._id,
    //             name:newUser.name,
    //             email:newUser.email,
    //             verifiedAt:newUser.verifiedAt
    //         },
    //         verification,
    //     })
    //   )

    res.status(200).json({message:"Registeration Successfull"});
   }catch(error){
      res.status(400).json({message:"Something went wrong while registering"})
   }
}


const login=async(req,res,next)=>{
     const {email,password}=req.body;
     if(!email||!password){
        res.status(400).json({message:"Please fill all fields"});
     }
     try{
        
        const user=await Admin.findOne({email});

        if(!user){
            res.status(400).json({message:"User is not registered please register first"});
        }

        let checkPassword=await bcrypt.compare(password,user.password);

        if(!checkPassword){
            res.status(400).json({message:"Incorrect Password"});
        }

        const payload={
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        }

        jwt.sign(payload,config.get("jwtSecret"),{expiresIn:3600},(err,token)=>{
            if(err){
                res.status(400).json({message:"something went wrong in JWT"});
            }
        })

        res.status(200).json({message:"LOGIN SUCCESSFULL"})
     }catch(error){
        res.status(400).json({message:error});
     }
}


const forgot=async(req,res,next)=>{
    const {email}=req.body;
    if(!email){
        res.status(400).json({message:"Please provide email"})
    }
   try{
      let user=await Admin.findOne({email})

      if(!user){
        res.status(400).json({message:"Invalid Email"});
      }

      let verification=await Verification.findOne({
        userId:user._id,
        type:"Forgot Password"
      })

      if(verification){
        verification=await Verification.findByIdAndDelete(verification._id);
      }

      let newVerification=new Verification({
        token:randomString(50),
        userId:user._id,
        type:"Forgot Password",
      })

      await newVerification.save();

      res.status(201).json({message:"Forgot verification has been sent"})
   }catch(error){
      res.status(400).json(error);
   }
}

const reset=async(req,res,next)=>{
   const {token,password}=req.body;
   
   if(!token||!password){
      res.status(400).json({message:"Token or password is not provided"});
   }
   try{
    
       let verification=await Verification.findOne({token,type:"Forgot Password"});
     if(!verification){
        res.status(400).json({message:"Token data that ypu input is not valid"})
     }
     
     let user=await Admin.findById(verification.userId);

     if(!user){
        res.status(400).json({message:"User not found"})
     }
     console.log("HELLO")
     let hash=await bcrypt.getSalt(10);
     
     let hashedPassword=await bcrypt.hash(password,hash);
     
     user=await Admin.findByIdAndUpdate(user._id,{password:hashedPassword})
     
     verification=await Verification.findByIdAndDelete(verification._id)
     
     res.status(200).json({message:"Password has been updated"})
     
   }catch(error){
      res.status(400).json({message:error})
   }
}
module.exports={
    register,login,forgot,reset
}