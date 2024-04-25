const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
       type:String,
       required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    role:{
        type:String,
        default:"user",
    },
    verifiedAt:{
        type:Date,
    }
   
},{timeStamps:true})

const Admin=mongoose.model("Admin",userSchema);
module.exports=Admin;