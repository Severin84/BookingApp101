import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Trips = () => {
  const [trips,setTrips]=useState([]);

  useEffect(()=>{
    const getData=async()=>{
       try{
          const response=await axios.get("http://localhost:5000/api/jobs")
          console.log(response.data.JOBS)
          setTrips(response?.data?.JOBS)
       }catch(error){
          console.log(error)
       }
   }
  //  const interval=setInterval(()=>getData(),3000);

  //  return()=>{
  //      clearInterval(interval)
  //  }
  getData();
  },[])

 
  //console.log(trips)
  return (
    <div>
      <div style={{justifyContent:"space-between",width:"50vw"}}>
        {
         trips && trips.map((value,idx)=>(
            <div key={idx} style={{backgroundColor:"wheat",borderRadius:"1rem",boxShadow:"inherit",margin:"1rem",gap:"2rem"}} >
            <input style={{marginLeft:"2rem"}} type="checkbox"/>  
            <span style={{marginLeft:"2rem"}}>{value.id}</span>
            <span style={{marginLeft:"2rem"}}>{value.name}</span>
            <span style={{marginLeft:"2rem"}}>{value.price}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Trips