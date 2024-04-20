const Job=require("../models/Job.js");
// const { main } = require("../utils/Scrapper.js");
const chromium=require("playwright");
const playwright=require("playwright")
const cheerio=require('cheerio')
//const puppeteer = require('puppeteer-core');
const SBR_WS_ENDPOINT = 'wss://brd-customer-hl_3d930120-zone-bookingapp:3up3ww12e3i4@brd.superproxy.io:9222';


const createJob=async(req,res,next)=>{
  const {url,JobType}=req.body;
    try{
      if(!url||!JobType){
        res.status(404).send({message:"more Info required"})
        return ;
      }
       const response=await Job.create({url:url,JobType:JobType})
  
      ///console.log(response)
       res.status(200).json({jobCreated:true});
     // res.status(200).json({url:url,JobType:JobType});
    }catch(error){
        res.status(400).json({message:error});
    }
    
  //console.log("FUCK")
}

const getJob=async(req,res,next)=>{
  const jobs=await Job.find({}).sort({createdAt:-1});

  const onGoingJobs=await Job.find({isCompleted:false})
   try{
    
    if(!jobs){
     res.status(400).json({message:"Somthing when wrong in geeting job"});
      return;
    }
    // else{
    //   return jobs.length;
    // }

     res.status(200).json({JOBS:jobs,length:onGoingJobs?.length||0});
   // res.status(200).json({message:jobs})
    // res.status(200).json({message:"vaba laba dub dub"})
   }catch(error){
     res.status(400).json({message:error})
   }
    
}


const scrap=async(req,res,next)=>{
   const {url}=req.body;
   try{
      const browser=await playwright.chromium.launch({headless:false});

      const page=await browser.newPage();
      await page.goto(url);


      let data=await page.evaluate(()=>{
        console.log("iccc")
          const packageElements=document.querySelectorAll(".packages-container");
          const packages=[];

          packageElements.forEach((packageElement)=>{
            const packageInfo={
                id:null,
                name:"",
                nights:0,
                days:0,
                inclusions:[],
                price:0,
            }

            const nameElement=packageElement.querySelector(".package-name a")
            const href=nameElement.getAttribute("href");
            const packageIdMatch=href?.match(/packageId=([^&]+)/);
            packageInfo.id=packageIdMatch ? packageIdMatch[1]:null;

            packageInfo.name=packageElement.querySelector(".package-name a").textContent  || "";

            const durationElement=packageElement.querySelector('.package-duration');

            packageInfo.nights=parseInt(durationElement?.querySelector(".night span")?.textContent || 0)

            packageInfo.days=parseInt(durationElement?.querySelector(".days span")?.textContent || 0)

            const inclusionsElement=packageElement.querySelector(".package-inclusions");

            const inclusionsItem=Array.from(inclusionsElement?.querySelectorAll("li")||[]).map((item)=>(item.querySelector(".icon-name"))?.textContent||"")

            packageInfo.inclusions=inclusionsItem;

            const priceElement=packageElement.querySelector(".final-price .amount");
            packageInfo.price=parseInt(priceElement?.textContent?.replace(/,/g,""))||0;

            packages.push(packageInfo)
          })
            return packages;
      })

      console.log(data)
      await browser.close();
   }catch(error){
        res.status(400).json({message:error});
   }
}

module.exports={
    createJob,getJob,scrap
}