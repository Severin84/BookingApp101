const mongoose =require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    name:{
        type:String,
    },
    image:{
       type:String,
    },
    price:{
        type:Number,
    },
    JobId:{
        type:Number,
    },
    location:{
        type:String,
    }
}{timestamps:true})

const Hotels=mongoose.model("Hotel",userSchema);
module.exports=Hotels;