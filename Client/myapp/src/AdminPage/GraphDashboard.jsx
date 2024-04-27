import { Card, CardBody, CardHeader } from '@nextui-org/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Bar} from "react-chartjs-2";
import Chart from "chart.js/auto"
const GraphDashboard = ({setCurrtrips,setCurrflights,setCurruser}) => {
    const [charData,setCharData]=useState({
      labels:[],
      datasets:[
        {
          label:"Flights",
          data:[],
          backgroundColor:"blue",
        },
        {
          label:"Trips",
          data:[],
          backgroundColor:"green"
        }
      ]
    })
   const processData=(data)=>{
      const aggregation={};

      data.Flights.forEach((item)=>{
         const got=item.updatedAt.split("T")[0];
         if(!aggregation[got]){
            aggregation[got]={flights:0,trips:0};
         }
         aggregation[got].flights+=1
      })

      data.Trips.forEach((item)=>{
        const got=item.updatedAt.split("T")[0];

        if(!aggregation[got]){
            aggregation[got]={flights:0,trips:0};
        }
        aggregation[got].trips+=1;
      })

      const objData=Object.keys(aggregation);

      const flights=objData.map((item)=>aggregation[item].flights);
      const trips=objData.map((item)=>aggregation[item].trips);

      return {
        labels:objData,
        datasets:[
            {label:"Flights",data:flights,backgroundColor:"#d52b7a"},
            {label:"Trips",data:trips,backgroundColor:"#520cf4"},
        ]
      }
      // return aggregation;
   }


  useEffect(()=>{
     const getData=async()=>{
        const response=await axios.get(`http://localhost:5000/api/database/allData`)
        setCurrflights(response.data.Flights)
        setCurrtrips(response.data.Trips)
        const newData=processData(response.data)
       setCharData(newData);
     }

    //  const interval=setInterval(()=>getData(),3000);

    //  return()=>{
    //    clearInterval(interval)
    //   }
     getData()
  },[])
  return (
    
    <div>
        <Card className="h-[400px]">
            <CardHeader>Scraping Logs</CardHeader>
            <CardBody className='flex items-center justify-center'>
                <Bar data={charData} height={400} width={1000}/>
            </CardBody>
        </Card>
    </div>
  )
}

export default GraphDashboard