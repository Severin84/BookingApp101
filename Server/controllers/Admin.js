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
    console.log(email);
    const user=await Admin.findOne({email,password});

    if(!user){
      res.json({message:"Invalid email or Password"})
    }else{
      //console.log("Hello from back");
      const token=await createToken(email,user.id);
      //console.log(token)
     // cookies.set("access_token",token);
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
   


//    let admin=new Admin({
//       email:email,
//       password:password
//    })
//    admin.save()
//    .then(response=>{
//     res.json({
//         message:"Admin in"
//     })
//    }).catch(error=>{
//     res.json({
//         message:"Some error occured while Admitting the Admin"
//     })
//    })
}


module.exports={
    getAdminData,
}