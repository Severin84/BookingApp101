import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";

const TripsDetails = () => {
   const params=useParams();
   const [trip,setTrips]=useState([]);
   useEffect(()=>{
      getData();
   },[])
   async function getData(){
      const data=await axios.get(`http://localhost:5000/api/tripDetails/${params.id}`)
      // console.log(data.data.data);
      setTrips([data.data.data]);
   }
console.log(trip)

  return (
    <div>
      <div>
      {trip.map((value,idx)=>(
             <div key={idx} style={{width:"60vw",margin:"2rem"}}>
               <div style={{display:"flex",fontSize:"2rem"}}>
                  <FaBagShopping />
                  <span>{value?.name}</span>
               </div>
               <div style={{display:"flex"}}>
                  <div style={{display:"flex",gap:"4rem"}}>
                 <span>id:{value?.id}</span>
                 <span>Destination:{value?.destinationItinerary[0].place}</span>
                 <span>TotalNight:{value?.destinationItinerary[0].totalNights}</span>
                 </div>
                 <div style={{right:'0rem',position:"relative",marginLeft:"20rem"}}>
                   <span>Cost:{value?.price}</span>
                 </div>
               </div>
               <div style={{marginTop:"5rem"}} >
               <div style={{marginBottom:"2rem"}}>
               <p>{value?.description}</p>
               </div>
               {value?.detailedIntineary.map((val,idx)=>(
                     <div key={idx} style={{marginTop:"2rem",marginBottom:"2rem"}}>
                     <p style={{fontWeight:"700"}}>{val.title}</p>
                     <p>{val.value[0]}</p>
                     </div>
                  ))}
               </div>
             </div>
         ))}
      </div>
    </div>
  )
}

export default TripsDetails