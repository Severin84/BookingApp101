import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdFlight } from "react-icons/md";
import { IoIosPricetag, IoMdPerson } from 'react-icons/io';
const Flightspage = () => {
    const params=useParams();
    const [data,setData]=useState([]);
    const [price,setprice]=useState(0);
    const [people,setPeople]=useState(1);
    //console.log(params)
    useEffect(()=>{
       let response;
        const getData=async()=>{
           try{
              response=await axios.get(`http://localhost:5000/api/flightData/${params.src}/${params.dest}`)
              setData(response?.data?.data);
           }catch(error){
              console.log(error)
           }
       }      
       //while(response?.data?.data?.length===0){
         const interval=setInterval(()=>getData(),5000);
         return()=>{
             clearInterval(interval)
         }
          getData();
      // }
     
      },[])
      //console.log(data)
      
  return (
    <div style={{display:"flex"}}>
      <div>
        {
          data && data.map((value,idx)=>(
            <div key={idx} style={{display:"flex",height:"10rem",width:"60vw",justifyContent:"space-between",margin:"2rem",boxShadow:"2px 1px 1px #000000",borderRadius:"1rem"}}>
              <div>
              <img style={{borderRadius:"2.5rem",height:"3rem",width:"3rem"}} src={value.logo}/>
              <span>{value.name}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                <span style={{color:"#1a5794",fontSize:"1.3rem"}}>from</span>
                <span style={{fontSize:"1.3rem"}}>{value.from}</span>
                <span style={{fontSize:"1.3rem"}}>{value.departureTime}</span>
              </div>
               <div >
                <div style={{backgroundColor:"#5eace7",height:"3rem",width:"3rem",borderRadius:"2rem",display:"flex",justifyContent:"center"}}>
               <MdFlight  style={{fontSize:"2rem",color:"#0861b9",marginTop:"0.5rem"}}/>
               </div>
               </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                <span style={{color:"#0861b9",fontSize:"1.3rem"}}>to</span>
                <span style={{fontSize:"1.3rem"}}>{value.to}</span>
                <span style={{fontSize:"1.3rem"}}>{value.arrivalTime}</span>
              </div>
              <div style={{backgroundColor:"#d3c3ff",width:"10rem",display:"flex",borderRadius:"0 1rem 1rem 1rem",flexDirection:"column",justifyContent:"center",paddingLeft:"2rem"}}>
                <span style={{fontSize:"3rem"}}>${value.price}</span>
                <div style={{width:"5rem",height:"2.5rem",backgroundColor:"#000000",color:"white",borderRadius:"0.5rem",display:"flex",justifyContent:"center"}}>
                <button style={{fontSize:"1.5rem"}} onClick={()=>setprice(value.price)}>Select</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div style={{width:"20vw",height:"10rem",display:'flex',flexDirection:"column",gap:"1rem",border:"solid",borderColor:'black',borderRadius:"1rem"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
              <div style={{gap:"1rem",display:"flex"}}>
              <IoIosPricetag style={{fontSize:'1.5rem',marginTop:"0.5rem"}}/>
              <span style={{fontSize:'1.5rem'}}>Price</span>
              </div>  
            <span style={{fontSize:'1.5rem',paddingRight:"2rem"}}>{price}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <IoMdPerson style={{fontSize:'1.5rem'}}/>
          <input type="number" style={{height:"2rem",width:'3vw',backgroundColor:"transparent",borderRadius:'0.5rem',fontSize:"1.5rem"}}value={people} onChange={(e)=>setPeople(e.target.value)}/>
          </div>
          {/* <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:'1.5rem'}}>Nights</span>
            <span style={{fontSize:'1.5rem'}}>kk</span>
          </div> */}
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:'1.5rem'}}>Total</span>
            <span style={{fontSize:'1.5rem',paddingRight:"2rem"}}>{price*people}</span>
          </div>
          <div style={{display:'flex',justifyContent:"center",position:"relative"}}>
            <button style={{width:"12rem",backgroundColor:"#247bd3",borderRadius:"1.5rem",height:"2rem"}}>Proceed to Payments</button>
          </div>
      </div>
    </div>
  )
}

export default Flightspage