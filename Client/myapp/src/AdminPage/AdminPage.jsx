import React,{useState} from 'react'
import SideBar from './SideBar'
import Hotels from './Components/Hotels';
import Bookings from './Components/Bookings';
import ScrapsData from './Components/ScrapsData';
import DashBoard from "./DashBoard";
import Trips from "./Components/Trips"
import {MdOutlineDataUsage} from "react-icons/md";
import {BiSolidCategory} from "react-icons/bi";
import {FaBookOpen,FaHome,FaHotel} from "react-icons/fa";

const AdminPage = () => {
  const [selectedItem,setSelectedItem]=useState(<DashBoard/>);
 const menuItem=[
    {lable:"DashBoard",icons:<FaHome/>,link:<DashBoard/>},
    {lable:"Trips",icons:<BiSolidCategory/>,link:<Trips/>},
    // {lable:"Hotels",icons:<FaHotel/>,link:<Hotels/>},
    {lable:"Bookings",icons:<FaBookOpen/>,link:<Bookings/>},
    {lable:"Scrape Data",icons:<MdOutlineDataUsage/>,link:<ScrapsData/>},
 ]
  return (
   <section className='bg-[#f5f5fe] flex'>
    <SideBar menuItem={menuItem} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    <section className='flex-1 flex flex-col'>
      <div className='h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3'>
      <h1 className='text-5xl'>DASHBOARD</h1>
     </div>
      {
        selectedItem
      }
    </section>
   </section>
  )
}

export default AdminPage