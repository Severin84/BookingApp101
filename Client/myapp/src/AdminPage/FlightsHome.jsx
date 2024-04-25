import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Img from "../utils/divyadarshi-acharya-BCxWgm5hpPQ-unsplash.jpg";
import { useNavigate } from 'react-router-dom';
import { cityAirportCode } from '../utils/CityAirportCodes';
import axios from "axios"
const FlightsHome = () => {
    const navigate=useNavigate()
    const [startDate,setStartDate]=useState(new Date())
    const [search,setSearch]=useState("");
    const [index,setIndex]=useState();
    const [fromcode,setFromCode]=useState();
    const [toCode,setToCode]=useState();
    function findFromCodes(text){
        let s=Object.values(cityAirportCode).map((val,idx)=>{
            val.toLowerCase()===text&&setFromCode(Object.keys(cityAirportCode)[idx])
        })
    }

    function findToCodes(text){
      let s=Object.values(cityAirportCode).map((val,idx)=>{
          val.toLowerCase()===text&&setToCode(Object.keys(cityAirportCode)[idx])
      })
    }

    function pageNavigate(){
        navigate(`/trips/${search}`)
    }

    async function getFlights(){
      if(setStartDate && fromcode && toCode){
        const response=await axios.post("link",{
          url:`https://www.kayak.com/flights/${fromcode}-${toCode}/${startDate}/`,
          JobType:"Flight"
        })
      }
    }

    

    //console.log(format startDate)
  return (
    <div >
    <div style={{backgroundImage:`url(${Img})`,backgroundRepeat:"no-repeat",backgroundAttachment:'fixed',backgroundSize:"100% 100%"}}>
     <section>
         <div style={{height:"70vh",justifyContent:"center",position:"relative",alignContent:"center",marginLeft:"35vw"}}>
             <div style={{marginTop:"-7rem"}}>
                 <span style={{fontSize:"2rem",marginLeft:'6rem',color:"white"}}>Best Price</span>
             </div>
             <div style={{marginTop:"2rem"}}>
                 <span style={{fontSize:"3rem",marginLeft:'1rem',color:"white"}}>AnyTime AnyWhere</span>
             </div>
             <div style={{gap:"5rem",position:"relative",display:"flex",marginLeft:"-4rem"}}>
                 <input placeholder='Flights ' style={{height:"2rem",borderRadius:"1rem"}} onChange={(e)=>findFromCodes(e.target.value)}/>
                 <input placeholder='Flights' style={{height:"2rem",borderRadius:"1rem"}} value={fromcode} onChange={(e)=>findToCodes(e.target.value)}/>
                 <DatePicker  selected={startDate} dateFormat="yyyy-MM-dd" onChange={(date)=>setStartDate(date)}/>
                 <button style={{height:"2rem",borderRadius:"1rem",backgroundColor:'#6f074e',width:'5rem'}} value={toCode} onClick={()=>{pageNavigate();getFlights()}}>Search</button>
             </div>
         </div>
     </section>
     <section style={{height:"20vh",display:"flex",justifyContent:"center",gap:"20rem",backdropFilter:"blur(4px)",color:"white"}}>
         <div>
             <div>
               <h2 style={{fontWeight:"bold"}}>Destination</h2>
               <ul>USA</ul>
               <ul>Canada</ul>
               <ul>UK</ul>
               <ul>Goa</ul>
             </div>
         </div>
         <div>
             <div>
               <h2 style={{fontWeight:"bold"}}>Adventures</h2>
               <ul>Extreme</ul>
               <ul>In Air</ul>
               <ul>Nature And Wildlife</ul>
               <ul>Winter Sports</ul>
             </div>
         </div>
         <div>
             <div>
               <h2 style={{fontWeight:"bold"}}>Connect With Us</h2>
               <div style={{display:"flex",gap:"1rem"}}>
             <BiLogoGmail/>
             <FaFacebook/>
             <FaInstagram/>
             <FaLinkedin/>
             <FaTwitter/>
             <FaYoutube/>
             </div>
             </div>
         </div>
     </section>
    </div>
    </div>
  )
}

export default FlightsHome