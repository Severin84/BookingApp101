import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";

const Bookings = () => {

  const [booking,setBooking]=useState([]);

  useEffect(()=>{
    const getData=async()=>{
       try{
          const response=await axios.get("http://localhost:5000/api/allFlightData")
         // console.log(response.data.FlightData)
          setBooking(response?.data?.FlightData)
       }catch(error){
          console.log(error)
       }
   }
   const interval=setInterval(()=>getData(),15000);

   return()=>{
       clearInterval(interval)
   }
  getData();
  },[])
  return (
    <div>
      <div>
        {
          booking.map((value,idx)=>(
             <div key={idx}  style={{display:"flex",width:"50vw",justifyContent:"space-between",height:"2rem",margin:"1rem",backgroundColor:"#c6eaff",borderRadius:"1rem"}}>
                 <div style={{display:"flex"}}>
                 <img src={value.logo} style={{height:'1.5rem',width:"1.5rem",borderRadius:"1rem",marginTop:"0.25rem"}}/>
                 <span>{value.name}</span>
                 </div>
                 <div style={{display:"flex",justifyContent:"space-between",gap:"1rem"}}>
                  <span>{value.from}</span>
                  <FaArrowRight />
                  <span>{value.to}</span>
                 </div>
                 <div style={{display:"flex"}}>
                  <span>${value.price}</span>
                  </div>
                  <div style={{paddingRight:"1rem",paddingTop:"0.2rem"}}>
                    <input type="checkbox"/>
                  </div>
             </div> 
          ))
        }
      </div>
    </div>
  )
}

export default Bookings