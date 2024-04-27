import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TripsDetails from './TripsDetails';

const TripsPage = () => {
    const params=useParams();
    const navigate=useNavigate();
    const [trips,setTrips]=useState([])
    useEffect(()=>{
       getData();
    },[])
    
    async function getData(){
        const data=await axios.get(`http://localhost:5000/api/trips`);
       
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

  return (
    <div>
        {
            trips.map((value,idx)=>(
                <div key={idx} style={{display:"flex",width:"90vw",height:"10rem",margin:"2rem",overflowY:"hidden",overflowX:"hidden",borderRadius:"1rem",backgroundColor:"#e3e0e0"}} onClick={()=>showData(value._id)}>
                    <div >
                    <img style={{height:"10rem",width:"60rem"}}  src={value.destinationDetails[0].image}/>
                    </div>
                    <div >
                    <span style={{fontSize:"1.5rem", fontWeight:"bold"}}>{value.destinationDetails[0].name}</span>
                    <div style={{height:"3rem",overflowY:"hidden"}}>
                    <p style={{overflow:"hidden"}}>{value.destinationDetails[0].description}</p>
                    </div>
                    <div style={{paddingTop:"1rem",fontWeight:"bold"}}>
                    <span>TotalNights:{value.destinationItinerary[0].totalNights}</span>
                    </div>
                   </div>
                   
                </div>
            ))
        }
    </div>
  )
}

export default TripsPage