const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String
    },
    password:{
        password:String
    },
   
},{timeStamps:true})

const Admin=mongoose.model("Admin",userSchema);
module.exports=Admin;