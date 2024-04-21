import React, { useState } from 'react'
import Img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [openLogin,setLogin]=useState(false);
    const navigate=useNavigate();
    
  return (
    <div>
    <div style={{backgroundImage:`url(${Img})`}}>
        <section style={{height:"10vh",backdropFilter:"blur(4px)"}}>
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem"}}>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Tours</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Flights</span>
                <span style={{fontSize:"1.5rem",marginTop:"1rem"}}>Hotels</span>
            </div>
            <div style={{display:"flex",alignContent:"center",position:"relative",justifyContent:"center",gap:"2rem",marginLeft:"20rem"}}>
                <div>
                <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"5rem"}} onClick={()=>navigate('/login')}>Login</button>
                </div>
                <button style={{fontSize:"1.5rem",marginTop:"1rem",borderRadius:"1rem",backgroundColor:"#b1a2a2",width:"5rem"}} onClick={()=>navigate('/signup')}>SignUp</button>
            </div>
        </div>
    </section>
    </div>
    </div>
  )
}



export default NavBar


