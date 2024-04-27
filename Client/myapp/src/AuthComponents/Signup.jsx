
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import img from "../utils/fernando-meloni-j_gnGCDQRew-unsplash.jpg"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../utils/carolina-nichitin-5OY83OiKlNQ-unsplash.jpg"
const Signup = ({setIsLogged}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  // const [confirmPassword,setConfirmPassword]=useState("");

  const handleRegister=async()=>{
     const response=await axios.post('http://localhost:5000/api/admin/register',{email:email,password:password,name:name});
     if(response.status===200){
       setIsLogged(true);
       navigate("/home");
     }
  }
  const navigate=useNavigate();
  return (
    <div className='h-[100vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(${img})`}}>
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-2xl'></div>
            <Card className='shadow-2xl bg-opacity-20 w-[480px] z-0'>
                <CardHeader className='flex flex-col gap-1 capitalize text-3xl items-center'>
                    <div className='flex flex-col item-center justify-center'>
                        <Image 
                        src={logo}
                        alt="logo"
                        style={{height:"80px",width:"80px",borderRadius:"2.5rem",marginLeft:"4rem"}}
                        height={80}
                        width={80}
                        className='cursor-pointer'/>
                        <span className='text-xl uppercase font-medium italic text-white'>
                            <span>BookIng Wise SignUp</span>
                        </span>
                    </div>
                </CardHeader>
                <CardBody className='flex flex-col items-center w-full justify-center'>
                  <div className='flex flex-col gap-2 w-full'>
                    <Input placeholder='Name' type="Name" value={name} onChange={e=>setName(e.target.value)} color="danger"/>
                    <Input placeholder='Email' type="email" value={email} onChange={e=>setEmail(e.target.value)} color="danger"/>
                    <Input placeholder='password' type="password" value={password} onChange={e=>setPassword(e.target.value)} color="danger"/>
                    {/* <Input placeholder='confirm password' type="password" value={password} onChange={e=>setConfirmPassword(e.target.value)} color="danger"/> */}
                  </div>
                </CardBody>
                <CardFooter className='flex flex-col gap-2 items-center justify-center'>
                    <Button color="danger" variant='shadow' className='w-full capitalize' size="lg" onClick={()=>handleRegister()}>Submit</Button>
                    <span onClick={()=>navigate("/login")} style={{cursor:"pointer"}}>Already Registred?</span>
                </CardFooter>
            </Card>
        </div>
  )
}

export default Signup