const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    url:{
        type:String
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:true,
    },
    JobType:{
        type:JSON
    },
},{timestamps:true})

const Job=mongoose.model("Job",userSchema);
module.exports=Job;