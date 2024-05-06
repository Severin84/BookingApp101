const express=require('express');
const { getJob, getTrips, getTripDetails, scrapFlights, getFlightsData, scrapHotels, FlightBooking } = require('../controllers/Jobs');
const router=express.Router();

router.route("/tripDetails/:id").get(getTripDetails)
router.route("/jobs").get(getJob)
 router.route("/trips/:id").get(getTrips)
router.route("/flightData/:src/:dest").get(getFlightsData)
router.route("/allFlightData").get(FlightBooking)
router.route("/flights/:src/:dest/:date").post(scrapFlights)
router.route("/scrapHotels").post(scrapHotels)

module.exports=router