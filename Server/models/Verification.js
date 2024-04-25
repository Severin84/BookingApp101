const mongoose =require("mongoose");


const verificationSchema=new mongoose.Schema({
    token:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,""],
    },
    type:{
        type:String,
        required:[true,""],
    }
},{timestamps:true});

module.exports=mongoose.model("Verfication",verificationSchema);