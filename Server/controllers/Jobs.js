const Job=require("../models/Job.js");
// const { main } = require("../utils/Scrapper.js");
const chromium=require("playwright");
const playwright=require("playwright")
const cheerio=require('cheerio');
const Trips = require("../models/Trips.js");
const Flights = require("../models/Flights.js");
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
  //console.log("kee")
  const jobs=await Job.find().sort({createdAt:-1});

  //const onGoingJobs=await Job.find({isCompleted:false})
   try{
    
    if(!jobs){
     res.status(400).json({message:"Somthing when wrong in geeting job"});
    }
    // else{
    //   return jobs.length;
    // }
   // console.log(jobs)

     res.status(200).json({JOBS:jobs,length:jobs?.length||0});
   // res.status(200).json({message:jobs})
    // res.status(200).json({message:"vaba laba dub dub"})
   }catch(error){
     res.status(400).json({message:error})
   }
    
}

const getTrips=async(req,res,next)=>{
   const data=await Trips.find();
   try{
    if(!data){
      res.status(400).json({message:"Somthing went worng"});
    }
    res.status(200).json({Trips:data});
   }catch(error){
    res.status(400).json({message:error})
   }
   
}

const getTripDetails=async(req,res,next)=>{
   const  id=req.params.id;
   console.log(id)
   if(!id){
    res.status(400).json({message:"Somthing went worng"});
   }
   try{
    let response=await Trips.findOne({_id:id});

    if(!response){
     res.status(400).json({message:"Somthing went worng second time"});
    }
    res.status(200).json({data:response});
   }catch(error){
    res.status(400).json({message:error})
   }
}

const scrap=async(req,res,next)=>{
   const {url,JobType}=req.body;
   try{
      if(JobType==="location"){
        const browser=await playwright.chromium.launch({headless:false});
        const page=await browser.newPage();
        await page.goto(url);
        let data=await page.evaluate(()=>{
          const packageElements = document.querySelectorAll(".packages-container");

          const packages= [];
      
          packageElements.forEach((packageElement) => {
            const packageInfo= {
              id: null,
              name: "",
              nights: 0,
              days: 0,
              // destinationItinerary: "",
              inclusions: [],
              price: 0,
              // image: "",
            };
      
            const nameElement = packageElement.querySelector(
              ".package-name a"
            );
            const href = nameElement.getAttribute("href");
            const packageIdMatch = href?.match(/packageId=([^&]+)/);
            packageInfo.id = packageIdMatch ? packageIdMatch[1] : null;
      
            // Extracting package name
            packageInfo.name =
              (packageElement.querySelector(".package-name a"))
                .textContent || "";
      
            // Extracting package duration in nights and days
            const durationElement = packageElement.querySelector(".package-duration");
            packageInfo.nights = parseInt(
              (durationElement?.querySelector(".nights span"))
                ?.textContent || 0
            );
            packageInfo.days = parseInt(
              (durationElement?.querySelector(".days span"))
                ?.textContent || 0
            );
      
            // Extracting destination itinerary
            // const destinationsElement = packageElement.querySelector(
            //   ".package-destinations"
            // );
            // packageInfo.destinationItinerary =
            //   destinationsElement?.textContent?.trim() || "";
      
            // Extracting package inclusions
            const inclusionsElement = packageElement.querySelector(
              ".package-inclusions"
            );
            const inclusionItems = Array.from(
              inclusionsElement?.querySelectorAll("li") || []
            ).map(
              (item) =>
                (item.querySelector(".icon-name"))?.textContent || ""
            );
            packageInfo.inclusions = inclusionItems;
      
            // // Extracting package price
            const priceElement = packageElement.querySelector(".final-price .amount");
            packageInfo.price =
              parseInt(priceElement?.textContent?.replace(/,/g, "")) || 0;
      
            packages.push(packageInfo);
          });
      
          return packages;
        })
    
        //console.log(data)
        data.forEach(async(pkg) =>{
          const response=await Job.findOne({url:pkg.url})
          // console.log("dush")
          if(!response){
            const job=await Job.create({url:`https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,JobType:"package",nights:pkg.nights,price:pkg.price,id:pkg.id,name:pkg.name,days:pkg.days})
          }
        });
        // forEach(let pkg in data){
           
        // }
        await browser.close()
        // console.log(data)
      }
      console.log("for package")
      const package=await Job.find({JobType:"package"});
      for(const pkg of package){
        if(pkg.JobType==="package"){
          const alreadyScrapped=await Trips.findOne({url:pkg?.url})
          if(!alreadyScrapped){
             console.log("connected! Naviagating to "+pkg.url)
             if(pkg.url){
              const browser=await playwright.chromium.launch({headless:false});
              const page=await browser.newPage();
              await page.goto(pkg.url);
              
              //console.log(response)
              
              console.log("navigated! Scraping page content..");
              let data=await page.evaluate(()=>{
               

                //=========================================================

                const packageDetails = {
                  description: "",
                  images: [],
                  themes: [],
                  detailedIntineary: [],
                  destinationItinerary: [],
                  destinationDetails: [],
                  packageIteniary: [],
                };
                console.log("in evalute");
                const packageElement = document.querySelector("#main-container");
                const descriptionSelector = packageElement?.querySelector("#pkgOverView");
                const regex = new RegExp("Yatra", "gi");
                descriptionSelector?.querySelector(".readMore")?.click();
                packageDetails.description = packageElement
                  ?.querySelector("#pkgOverView p")
                  ?.innerHTML.replace(regex, "Arklyte") ;
            
                packageDetails.images = Array.from(
                  packageElement?.querySelectorAll(".galleryThumbImg")
                ).map((imageElement) =>
                  imageElement
                    .getAttribute("src")
                    ?.replace("/t_holidays_responsivedetailsthumbimg", "")
                );
            
                const themesSelector = packageElement?.querySelector("#packageThemes");
                packageDetails.themes = Array.from(
                  themesSelector?.querySelectorAll("li")
                ).map((li) => li.innerText.trim());
            
                const descriptions=[];
            
                // Select all day elements
                const dayElements = packageElement?.querySelectorAll(
                  ".itineraryOverlay .subtitle"
                );
            
                dayElements?.forEach((dayElement) => {
                  const title = dayElement.textContent.trim();
                  const value = [];
            
                  // Get the next sibling elements until the next day element
                  let nextElement = dayElement.nextElementSibling;
                  while (nextElement && !nextElement.classList.contains("subtitle")) {
                    const textContent = nextElement.textContent.trim();
                    if (textContent) {
                      value.push(textContent);
                    }
                    nextElement = nextElement.nextElementSibling;
                  }
            
                  // Push the title and value into the result array
                  descriptions.push({ title, value });
                });
                console.log({ packageDetails });
                packageDetails.detailedIntineary = descriptions;
            
                // For destination Iteniary
                const destinationItinerary = [];
                const destinationItinerarySelector =
                  packageElement?.querySelectorAll(".type-list li");
            
                destinationItinerarySelector?.forEach((element) => {
                  const placeElement = element.firstChild;
                  const placeText = placeElement
                    ?.textContent.trim()
                    .replace(/[\n\t]/g, "");
            
                  const nightsElement = element.querySelector("span");
                  let totalNights = 0;
            
                  if (nightsElement) {
                    const nightsText = nightsElement?.textContent.trim();
                    const nightsMatch = nightsText.match(/\d+/);
                    totalNights = nightsMatch ? parseInt(nightsMatch[0]) : 0;
                  }
            
                  destinationItinerary.push({ place: placeText, totalNights });
                });
            
                packageDetails.destinationItinerary = destinationItinerary;
            
                const cities = [];
            
                // Click on "Read More" for the first city
                const readMoreButton = document.getElementById("readMore");
                if (readMoreButton) {
                  readMoreButton.click();
                }
            
                const cityElements = document.querySelectorAll(".tabbing a");
                cityElements.forEach((cityElement) => {
                  // Click on the city tab to load its description
                  cityElement.click();
            
                  // Click on "Read More" if available
                  const readMoreButtonCity = document.getElementById("readMore");
                  if (readMoreButtonCity) {
                    readMoreButtonCity.click();
                  }
            
                  const cityName = cityElement?.textContent.trim();
                  const cityDescription = document
                    .getElementById("aboutDestPara")
                    ?.textContent.trim();
                  const cityImage = document
                    .querySelector(".info-block img")
                    .getAttribute("src");
            
                  cities.push({
                    name: cityName,
                    description: cityDescription,
                    image: cityImage,
                  });
                });
            
                packageDetails.destinationDetails = cities;
            
                const dataExtracted=[];
                const timeline = document.querySelector(".time-line .right-column");
                const articles = timeline?.querySelectorAll("article");
            
                articles?.forEach((article) => {
                  const cityNameElement = article.querySelector(
                    ".title.row.acc-title .first.ng-binding"
                  );
                  const cityName = cityNameElement
                    ? cityNameElement?.textContent.trim()
                    : "";
                  const daysSelector = article.querySelectorAll(".days.acc-content");
                  const daysActivity = [];
            
                  daysSelector.forEach((daySelector) => {
                    const activityElements = daySelector.querySelectorAll(".items-content");
                    const activities = [];
                    // Check if any activity elements exist
                    if (activityElements.length > 0) {
                      // Loop through each activity element
                      activityElements.forEach((activityElement, index) => {
                        // Extract activity type
                        const activityTypeElement =
                          activityElement.querySelector(".content.left.ico");
                        const activityType = activityTypeElement
                          ? activityTypeElement
                              ?.textContent.trim()
                              .split(" ")[0]
                              .split(" ")[0]
                              .split("\n")[0]
                          : `Activity ${index + 1}`;
            
                        let activityDescription = null;
            
                        if (activityType === "MEAL" || activityType === "SIGHTSEEING") {
                          const listHolder = activityElement.querySelector(".list-holder");
            
                          // Check if the list-holder element exists
                          if (listHolder) {
                            // Extract li elements
                            const liElements = listHolder.querySelectorAll("li.ng-scope");
            
                            // Check if any li elements exist
                            if (liElements.length > 0) {
                              // Create an array to store scraped data
                              const scrapedData = [];
            
                              // Loop through each li element and extract text content
                              liElements.forEach((liElement, index) => {
                                const liText = liElement?.textContent.trim();
                                scrapedData.push({ index: index + 1, text: liText });
                              });
            
                              // Log the scraped data
                              activityDescription = scrapedData;
                            }
                          }
                        } else if (activityType === "HOTEL") {
                          // Extract activity description
                          const activityDescriptionElement = activityElement.querySelector(
                            ".content.right .name a"
                          );
                          activityDescription = activityDescriptionElement
                            ? activityDescriptionElement?.textContent.trim()
                            : null;
                        } else if (activityType === "FLIGHT") {
                          const places =
                            activityElement.querySelectorAll(".place span.full");
            
                          const scrappedData=[];
                          places.forEach((place) => {
                            scrappedData.push(place?.textContent.trim());
                          });
                          activityDescription = scrappedData;
                        }
                        // Log the results
            
                        activities.push({ activityType, activityDescription });
                      });
                    }
                    daysActivity.push(activities);
                  });
            
                  dataExtracted.push({
                    city: cityName,
                    daysActivity,
                  });
                });
            
                packageDetails.packageIteniary = dataExtracted;
            
                return packageDetails;
              }
            )
              const response = await Trips.create({id:pkg?.id,name:pkg?.name,nights:pkg?.nights,days:pkg?.days,destinationItinerary:data?.destinationItinerary,images:data?.images,inclusions:pkg?.inclusions,theme:data?.themes,price:pkg?.price,destinationDetails:data?.destinationDetails,detailedIntineary:data?.detailedIntineary,description:data?.description,packageIteniary:data?.packageIteniary})
              //console.log(response);
              await browser.close()
             }
          }
         }
         
      }
      
     
      //console.log(data)
      //await browser.close();
   }catch(error){
        res.status(400).json({message:error});
   }
}

const scrapFlights=async(req,res,next)=>{
  const query=req.params;
  const {url,JobType}=req.body;
  try{
     if(JobType==="flight"){
        console.log("in flight scraping");
        console.log("connected! navigating to :"+url);
        const browser=await playwright.chromium.launch({headless:false});
        const page=await browser.newPage();
        await page.goto(url);
        console.log("Navigated! Scraping page content...");
    //     //=============================================================
    //     let flights=await page.evaluate(()=>{
    //            console.log("0")
    //            const data=[];
    //            console.log("1")
    //            const fightSelectors=document.querySelectorAll(".nrc6-wrapper");
    //            console.log("2")
    //            fightSelectors.forEach((flightElement)=>{
    //              const airlinelogo=flightElement.querySelector("img")?.src || "";
    //              console.log("3")
    //              const [rawDepartureTime,rawArrivalTime]=(flightElement.querySelector(".vmXl")?.innerText || "").split(" - ");
    //              console.log("4")
    //              const extractTime=(rawTime)=>{
    //                const timeWithoutNumber=rawTime.replace(/[0-9+\s]+$/,"").trim();
    //                return timeWithoutNumber
    //              }
    //              console.log("5")
    //              const departureTime=extractTime(rawDepartureTime);
    //              const arrivalTime=extractTime(rawArrivalTime);
    //              console.log("6")
    //              const flightDuration=(flightElement.querySelector(".xdW8")?.children[0]?.innerText || "").trim();
    //              console.log("7")
    //              const airlineName=(flightElement.querySelector(".VY2U")?.children[1]?.innerText || "").trim();
    //              console.log("8")
    //              const price=parseInt((flightElement.querySelector(".f8F1-price-text")?.innerText || "").replace(/[^\d]/g,"").trim(),10);
    //              console.log("9")
    //              data.push({
    //               airlinelogo,
    //               departureTime,
    //               arrivalTime,
    //               flightDuration,
    //               airlineName,
    //               price,
    //              })

    //              console.log("10")
    //            })
    //             return data;
    //        })

          // await Job.updateOne(url,{isCompleted:true,status:"complete"});

          //  for(const flight of flights){
          //   await Flights.create({
          //     name:flight?.airlineName,
          //     logo:flight?.airlinelogo,
          //     from:query?.from,
          //     to:query?.to,
          //     departureTime:flight?.departureTime,
          //     arrivalTime:flight?.arrivalTime,
          //     duration:flight?.flightDuration,
          //     price:flight?.price,
          //     jobId:Job?._id
          //   })
          //  }

          // console.log(flights)
          // await browser.close()
        //=============================================================
    //  }
     let data=await page.evaluate(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
  
      const flights= [];
  
      const flightSelectors = document.querySelectorAll(".nrc6-wrapper");
  
      flightSelectors.forEach((flightElement) => {
        const airlineLogo = flightElement.querySelector("img")?.src || "";
        const [rawDepartureTime, rawArrivalTime] = (
          flightElement.querySelector(".vmXl")?.innerText || ""
        ).split(" – ");
  
        // Function to extract time and remove numeric values at the end
        const extractTime = (rawTime)=> {
          const timeWithoutNumbers = rawTime.replace(/[0-9+\s]+$/, "").trim();
          return timeWithoutNumbers;
        };
  
        const departureTime = extractTime(rawDepartureTime);
        const arrivalTime = extractTime(rawArrivalTime);
        const flightDuration = (
          flightElement.querySelector(".xdW8")?.children[0]?.innerText || ""
        ).trim();
  
        const airlineName = (
          flightElement.querySelector(".VY2U")?.children[1]?.innerText || ""
        ).trim();
  
        // Extract price
        const price = parseInt(
          (flightElement.querySelector(".f8F1-price-text")?.innerText || "")
            .replace(/[^\d]/g, "")
            .trim(),
          10
        );
  
        flights.push({
          airlineLogo,
          departureTime,
          arrivalTime,
          flightDuration,
          airlineName,
          price,
        });
      });
      
      return flights;
    });


    //data.forEach(async(pkg)=>{
      let response=await Job.findOne({url:url});
      if(!response){
         await Job.create({url:url,isCompleted:true,status:"complete",JobType:JobType})
      }
    //})
    

    for(const val of data){
      await Flights.create({name:val.airlineName,logo:val?.airlineLogo,from:query.src,to:query.dest,departureTime:val.departureTime,arrivalTime:val.arrivalTime,duration:val.flightDuration,price:val.price})
    }
     console.log(data)
     browser.close()
     res.status(200).json({message:"Done"})
    }
    //res.status(400).json({message:"Not Done"})
  }catch(error){
     res.status(400).json({message:error})
  }
}

module.exports={
    createJob,getJob,scrap,getTrips,getTripDetails,scrapFlights
}