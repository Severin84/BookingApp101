const Admin=require("../models/Admin.js")
// import {SignJWT} from "jose";
// import {cookies} from "next/headers";
const cookies=require('cookies')
const {SignJWT}=require("jose");

//const {}=require("")

const alg="HS256";
const secret=new TextEncoder().encode(process.env.JWT_KEY);
const createToken=async(email,userId)=>{
    return await new SignJWT({email,userId,isAdmin:true}).setProtectedHeader({alg}).setExpirationTime("48h").sign(secret)
}

const getAdminData=async (req,res,next)=>{
  try{
    let {email,password}=await req.body;
    if(!email||!password){
       res.json({message:"Please enter both email and Password"})
    } 
    const user=await Admin.findOne({email,password});

    if(!user){
      res.json({message:"Invalid email or Password"})
    }else{
      const token=await createToken(email,user.id);
      res.json({
        userInfo:{
            id:user.id,
            email:user.email,
        },
       // message:"yaha par"
      })
    }
  }catch(error){
      res.json({message:"An error occure with admin"})
  }
   
}


module.exports={
    getAdminData,
}