import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
const Home = () => {
    const navigate=useNavigate()
    const [startDate,setStartDate]=useState(new Date())
    const [search,setSearch]=useState("");

    function pageNavigate(){
        navigate(`/trips/${search}`)
    }

  return (
   <div style={{backgroundImage:`url(${Img})`}}>
    {/* <section style={{height:"10vh",backdropFilter:"blur(4px)"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem"}}>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Tours</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Flights</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Hotels</span>
            </div>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem",marginLeft:"20rem"}}>
                <div>
                <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"5rem"}}>Login</button>
                </div>
                <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"2.5rem"}}>xyz</button>
            </div>
        </div>
    </section> */}
    {/* <NavBar/> */}
    <section>
        <div style={{height:"70vh",justifyContent:"center",position:"relative",alignContent:"center",marginLeft:"35vw"}}>
            <div style={{marginTop:"-7rem"}}>
                <span style={{fontSize:"2rem",marginLeft:'6rem'}}>Best Price</span>
            </div>
            <div style={{marginTop:"2rem"}}>
                <span style={{fontSize:"3rem",marginLeft:'1rem'}}>AnyTime AnyWhere</span>
            </div>
            <div style={{gap:"5rem",position:"relative",display:"flex",marginLeft:"-4rem"}}>
                <input placeholder='Search Location' style={{height:"2rem",borderRadius:"1rem"}} onChange={(e)=>setSearch(e.target.value)}/>
                <DatePicker selected={startDate}  onChange={(date)=>setStartDate(date)}/>
                <button style={{height:"2rem",borderRadius:"1rem",backgroundColor:'#6f074e',width:'5rem'}} onClick={()=>pageNavigate()}>Search</button>
            </div>
        </div>
    </section>
    <section style={{height:"20vh",display:"flex",justifyContent:"center",gap:"20rem",backdropFilter:"blur(4px)"}}>
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
  )
}

export default Home