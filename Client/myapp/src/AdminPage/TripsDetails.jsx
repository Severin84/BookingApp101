import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { IoIosPricetag } from "react-icons/io";
import { LiaPlaceOfWorshipSolid } from "react-icons/lia";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentComponent from '../PaymentComponent';

const stripePromise=loadStripe('pk_test_51OSPOtSCpvXYxeMvJRyvrTZFaN14ceJ85Wgd2sMYiUYPYzkI7zKh9thVs85WYgt7x5OcJEfagyQoyfwH3idOY5fH00NaXkCN25');
const TripsDetails = () => {
   const params=useParams();
   const [trip,setTrips]=useState([]);
   const [cost,setCost]=useState(0);
   const [nights,setNights]=useState(0);
   const [people,setPeople]=useState(1);
   useEffect(()=>{
      getData();
   },[])
   async function getData(){
      const data=await axios.get(`http://localhost:5000/api/tripDetails/${params.id}`)
      setTrips([data.data.data]);
   }
 
   console.log(trip)

  return (
    <div style={{display:"flex"}}>
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
                   <span >Cost:{value?.price}</span>
                 </div>
               </div>
               <div style={{marginTop:"5rem"}} >
               <div style={{marginBottom:"2rem"}}>
                  <div style={{display:"flex",flexWrap:"wrap"}}>
                     {
                        value?.destinationDetails?.map((val,idx)=>(
                           <div key={idx}>
                              {
                                 val.image?<img style={{height:'10rem',width:'14rem',borderRadius:"1rem"}} src={val?.image}/>:<LiaPlaceOfWorshipSolid  style={{fontSize:"10rem"}}/>
                              }
                           </div>
                        ))
                     }
                  </div>
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
     <Elements stripe={stripePromise}>
      <div style={{width:'18vw',height:"10rem"}}>
         {
            trip.map((value,idx)=>(
               <div key={idx}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                   <div style={{gap:"1rem",display:"flex"}}>
                   <IoIosPricetag  style={{fontSize:'1.5rem',marginTop:"0.5rem"}}/>
                   <span style={{fontSize:'1.5rem'}}>Price</span>
                   </div>  
                  <span style={{fontSize:'1.5rem'}}>{value?.price}</span>
               </div>
               <div style={{display:"flex",justifyContent:"space-between"}}>
               <IoMdPerson style={{fontSize:'1.5rem'}}/>
               <input type="number" style={{height:"2rem",width:'10vw',backgroundColor:"#b3b1b1",borderRadius:'0.5rem'}} onChange={(e)=>setPeople(e.target.value)}/>
               </div>
               <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:'1.5rem'}}>Nights</span>
                  <span style={{fontSize:'1.5rem'}}>{value?.destinationItinerary[0].totalNights}</span>
               </div>
               <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:'1.5rem'}}>Total</span>
                  <span style={{fontSize:'1.5rem'}}>{value?.price*people}</span>
               </div>
               <div style={{display:'flex',justifyContent:"center",position:"relative"}}>
                  <button style={{width:"12rem",backgroundColor:"#247bd3",borderRadius:"1.5rem",height:"2rem"}}>Proceed to Payments</button>
               </div>
               <div>
                 <PaymentComponent amount={value?.price * people}/>
               </div>
               </div>
            ))
         }
      </div>
      </Elements>
    </div>
  )
}

export default TripsDetails