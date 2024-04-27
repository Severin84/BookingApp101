import React, { useState } from 'react'
import GraphDashboard from './GraphDashboard'

const DashBoard = () => {
  const [currTrips,setCurrtrips]=useState(0);
  const [currFlights,setCurrflights]=useState(0);
  const [currUser,setCurruser]=useState(1);
  return (
    <div>
     <div style={{display:"flex",justifyContent:"center",gap:"1rem"}}>
        <div style={{display:"flex",flexDirection:"column",width:"7vw",height:"3rem",backgroundColor:"#cac8c8",borderRadius:"1rem",paddingLeft:"1rem"}}>
           <span style={{fontWeight:"bold"}}>User</span>
           <span>{currUser}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",width:"7vw",height:"3rem",backgroundColor:"#cac8c8",borderRadius:"1rem",paddingLeft:"1rem"}}>
           <span style={{fontWeight:"bold"}}>Flights</span>
           <span>{currFlights.length}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",width:"7vw",height:"3rem",backgroundColor:"#cac8c8",borderRadius:"1rem",paddingLeft:"1rem"}}>
           <span style={{fontWeight:"bold"}}>Trips</span>
           <span>{currTrips.length}</span>
        </div>
     </div>
     <div>
      <GraphDashboard setCurrtrips={setCurrtrips} setCurrflights={setCurrflights} setCurruser={setCurruser}/>
      </div>
    </div>
  )
}

export default DashBoard