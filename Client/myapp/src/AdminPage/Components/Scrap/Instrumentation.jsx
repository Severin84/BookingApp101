import React from 'react'
import {Browser} from "puppeteer"
export const Instrumentation = async() => {
  if(process.env.NEXT_RUNTIME==="nodejs"){
    const {Worker}=await import("bullmq")
    
  }  
  return (
    <div>Instrumentation</div>
  )
}

