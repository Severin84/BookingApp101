const express=require('express');
const { getJob, getTrips, getTripDetails, scrapFlights } = require('../controllers/Jobs');
const router=express.Router();

router.route("/tripDetails/:id").get(getTripDetails)
router.route("/jobs").get(getJob)
router.route("/trips").get(getTrips)
router.route("/flights/:src/:dest/:date").post(scrapFlights)

module.exports=router