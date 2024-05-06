import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TripsDetails from './TripsDetails';
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
const TripsPage = () => {
    const params=useParams();
    //console.log(params)
    const navigate=useNavigate();
    const [trips,setTrips]=useState([])
    useEffect(()=>{
       getData();
       const interval=setInterval(()=>getData(),15000);
       return()=>{
           clearInterval(interval)
       }
        getData();
    },[])
    
    async function getData(){
        const data=await axios.get(`http://localhost:5000/api/trips/${params?.id}`);
       let res=data.data.Trips.filter((d)=>(
          d.destinationItinerary.map((val,idx)=>(
              val.place===params.id
          )))
       )
       setTrips(res);
    }
    function showData(id){
      navigate(`/tripDetails/${id}`)
    }

    //console.log(trips)
  return (
    <div>
        {
            trips.map((value,idx)=>(
                <div key={idx} style={{display:"flex",width:"90vw",height:"10rem",margin:"2rem",overflowY:"hidden",overflowX:"hidden",borderRadius:"1rem",backgroundColor:"#e3e0e0"}} onClick={()=>showData(value._id)}>
                    <div style={{minWidth:"10rem",minHeight:"20rem",height:"10rem",float:"left"}} >{
                           <img style={{height:"10rem",width:"100%"}}  src={value?.images[0]}/>
                      }
                    </div>
                    <div  >
                    <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{value?.name}</span>
                    <div style={{height:"3rem",overflowY:"hidden"}}>
                    <p style={{overflow:"hidden"}}>{value?.description}</p>
                    </div>
                    <div style={{paddingTop:"1rem",fontWeight:"bold"}}>
                    <span>TotalNights:{value?.nights}</span>
                    </div>
                   </div>
                   
                </div>
            ))
        }
    </div>
  )
}

export default TripsPage