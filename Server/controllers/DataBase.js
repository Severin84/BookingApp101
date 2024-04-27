const Flights = require("../models/Flights.js");
const Job = require("../models/Job.js");
const Trips = require("../models/Trips.js");
// const  Flights = require("../models/Flights")



const getAllData=async(req,res,next)=>{
    try{
       const flights=await Flights.find();
       const trips=await Trips.find();
       const job=await Job.find();
       if(!flights||!trips||!job){
         res.status(400).json({message:"something went wrong while retriving flights or trips or jobs data"});
       }
       res.status(200).json({Flights:flights,Trips:trips,Job:job});

    }catch(error){
        res.status(400).json({message:"Something went wrong while getting Data from database"})
    }
}

module.exports={
    getAllData,
}