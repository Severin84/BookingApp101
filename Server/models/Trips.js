const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    id:{
       type:String,
    },
    name:{
        type:String
    },
    nights:{
        type:Number
    },
    location:{
        type:String
    },
    days:{
        type:Number
    },
    destinationItinerary:{
        type:JSON,
    },
    images:{
        type:JSON,
    },
    inclusions:{
        type:JSON,
    },
    themes:{
        type:JSON,
    },
    price:{
        type:Number,
    },
    destinationDetails:{
        type:JSON
    },
    detailedIntineary:{
        type:JSON,
    },
    description:{
        type:String
    },
    packageIteniary:{
        type:JSON,
    },

},{timestamps:true})

const Trips=mongoose.model("Trip",userSchema);
module.exports=Trips;