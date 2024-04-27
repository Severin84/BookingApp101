import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Sidebar as ReactProSidebar,Menu,MenuItem,sidebarClasses} from "react-pro-sidebar";
import {LuLogOut} from "react-icons/lu";
import { Image, SelectItem, select } from '@nextui-org/react';
import logo from "../utils/carolina-nichitin-5OY83OiKlNQ-unsplash.jpg"
// import { useState } from 'react'
const SideBar = ({menuItem,selectedItem,setSelectedItem}) => {
    const navigate=useNavigate();
 const handleItemClick=(link)=>{
    setSelectedItem(link);
 }
  return (

    <div className="min-h-[100vh] overflow-hidden">
        <ReactProSidebar className='h-full overflow-hidden' rootStyles={{[`.${sidebarClasses.container}`]:{backgroundColor:"#ffffff",},}}>
         <Menu className='h-[100vh] max-h-[100vh] text-black overflow-hidden' >

            <div className='flex items-center justify-center my-10 flex-col'>
                <img src={logo} alt="logo" style={{height:"80px",width:"80px",borderRadius:"2.5rem"}} className="cursor-pointer" onClick={()=>navigate('/admin')}/>
                <span className='text-3xl uppercase font-medium'>
                    <span>BookIng Wise</span>
                </span>
            </div>
            {
                menuItem.map((item,index)=>(
                    <React.Fragment>
                        <MenuItem icon={item.icons} active={selectedItem===item.link} onClick={()=>handleItemClick(item.link)}>{item.lable}</MenuItem>
                    </React.Fragment>
                ))
            }
            <MenuItem icon={<LuLogOut/>} active={selectedItem==="/admin/logout"}>LogOut</MenuItem>
         </Menu>
        </ReactProSidebar>
    </div>
  )
}

export default SideBar