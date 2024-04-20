import React,{useEffect, useState} from 'react'
import {Button, Card,CardBody,CardFooter,Input,Listbox,ListboxItem,Tab,Tabs} from "@nextui-org/react";
import axios from "axios";
import ScrapingQueue from './ScrapingQueue';
import CurrentlyScrapingTable from '../Components/CurrentlyScrapingTable';
const ScrapsData = () => {
  const [cities,setCities]=useState([]);
  const [selectedcity,setSelectedcity]=useState("");
  const [jobs,setJobs]=useState([]);

  const searchCities=async (searchString)=>{
    const response=await axios.get(`http://api.geonames.org/searchJSON?q=${searchString}&maxRows=10&username=adarsh84`)
   // console.log(response)
    const data=response.data?.geonames;
    setCities(data?.map((city)=>city.name)||[]);
  }

  const startScraping=async()=>{
    try{
      const response=await axios.post("http://localhost:5000/api/admin/job",{
        url:`https://packages.yatra.com/holidays/intl/search.htm?destination=${selectedcity}`,
        JobType:"location"
      })
       //console.log(response)
    }catch(error){
        console.log(error)
    }   
  }

  useEffect(()=>{
    const getData=async()=>{
      // const data=await ();
       //console.log(data);
       try{
          const response=await axios.get("http://localhost:5000/api/admin/allJobs")
         // console.log(response.data.length)
          //console.log(response)
          setJobs(response.data)
       }catch(error){
          console.log(error)
       }
   }
   const interval=setInterval(()=>getData(),3000);

   return()=>{
       clearInterval(interval)
   }
  },[])
  //console.log(jobs)
  //console.log(cities)
  return (
    <section className='m-10 grid grid-cols-3 gap-5 z-999 relative'>
     <Card className='col-span-2 z-999'>
      <CardBody>
      <Tabs className=' z-999'>
        <Tab key="location" title="Location">
         <input type="text" placeholder="Search for a location" onChange={(e)=>searchCities(e.target.value)}/>
         <div className='w-fill min-h-[200px] max-w-[260] px-1 py-2 rounded-small border-200 mt-5'>
          <Listbox onAction={(key)=>setSelectedcity(key)}>
          {
            cities.map((city)=>(
              <ListboxItem key={city} color="primary" className='text-primary-500'>
                {city}
              </ListboxItem>
            ))
          }
          </Listbox>
         </div>
        </Tab>
      </Tabs>
      </CardBody>
      <CardFooter className='flex flex-col gap-5'>
        <div>
          {selectedcity && (
            <h1 className='text-xl'>Scrape data for {selectedcity}</h1>
          )}
        </div>
        <Button size="lg" className="w-full" color="primary" onClick={()=>startScraping()}>Scrap</Button>
      </CardFooter>
     </Card>
     <ScrapingQueue/>
     <div className='col-span-3' >
      {jobs.length>0 && <CurrentlyScrapingTable  jobs={jobs}/>}
     </div>
    </section>
  )
}

export default ScrapsData