import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import apiClient from '../lib/ApiClient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SiAeroflot } from "react-icons/si";
//import { ADMIN_API_ROUTES } from '../lib/ApiRoutes';


const Login = ({setIsLogged}) => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    
    const handlelogin=async ()=>{
      try{
        // const response=await fetch("http://localhost:5000/api/admin/login",{
        // method:"POST",
        // body:JSON.stringify({email:email,password:password})
        //  })
        const response=await axios.post("http://localhost:5000/api/admin/login",{
          email:email,
          password:password
        })
        // console.log(response)
        if(response?.data?.userInfo?.email==="admin@gmail.com"){
          setIsLogged(true);
          navigate('/admin');
        }else{
          setIsLogged(true)
          navigate('/home')
        }
      }catch(error){
        console.log(error)
      }
    };

  return (
    <div className='h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(${img})`}}>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl'></div>
            <Card className='shadow-2xl bg-opacity-20 w-[480px] z-0'>
                <CardHeader className='flex flex-col gap-1 capitalize text-3xl items-center'>
                    <div className='flex flex-col item-center justify-center'>
                        <Image 
                        src={"LOGO"}
                        alt="logo"
                        height={80}
                        width={80}
                        className='cursor-pointer'/>

                        <span className='text-xl uppercase font-medium italic text-white'>
                            <span>ARKLYTE ADMIN LOGIN</span>
                        </span>
                    </div>
                </CardHeader>
                <CardBody className='flex flex-col items-center w-full justify-center'>
                  <div className='flex flex-col gap-2 w-full'>
                    <Input placeholder='Email' type="email" value={email} onChange={e=>setEmail(e.target.value)} color="danger"/>
                    <Input placeholder='password' type="password" value={password} onChange={e=>setPassword(e.target.value)} color="danger"/>
                  </div>
                </CardBody>
                <CardFooter className='flex flex-col gap-2 items-center justify-center'>
                    <Button color="danger" variant='shadow' className='w-full capitalize' size="lg" onClick={()=>handlelogin()}>Login</Button>
                </CardFooter>
            </Card>
        </div>
  )
}

export default Login