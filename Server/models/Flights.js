const mongoose =require('mongoose');
const Schema=mongoose.Schema;


const userSchema=new Schema({
    name:{
        type:String,
    },
    logo:{
        type:String,
    },
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    departureTime:{
        type:String,
    },
    arrivalTime:{
        type:String,
    },
    duration:{
        type:String,
    },
    price:{
        type:Number,
    },
    jobId:{
        type:Number,
    }
},{timestamps:true});


const Flights=mongoose.model("Flight",userSchema);
module.exports=Flights;