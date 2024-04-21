const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    id:{
       type:String,
    },
    url:{
        type:String
    },
    name:{
        type:String,
    },
    nights:{
        type:Number,
    },
    days:{
        type:Number
    },
    price:{
        type:Number
    },
    inclusions:{
        type:Array
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
        type:String,
    },
},{timestamps:true})

const Job=mongoose.model("Job",userSchema);
module.exports=Job;