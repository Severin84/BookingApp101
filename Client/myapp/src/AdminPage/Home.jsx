import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Img from "../utils/ian-schneider-PAykYb-8Er8-unsplash.jpg"
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
                <input placeholder='Search Location' style={{height:"2rem",borderRadius:"1rem"}} onChange={(e)=>setSearch(e.target.value)}/>
                <DatePicker selected={startDate}  onChange={(date)=>setStartDate(date)}/>
                <button style={{height:"2rem",borderRadius:"1rem",backgroundColor:'#6f074e',width:'5rem'}} onClick={()=>pageNavigate()}>Search</button>
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

export default Home