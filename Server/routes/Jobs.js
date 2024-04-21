const express=require('express');
const { getJob, getTrips, getTripDetails } = require('../controllers/Jobs');
const router=express.Router();

router.route("/tripDetails/:id").get(getTripDetails)
router.route("/jobs").get(getJob)
router.route("/trips").get(getTrips)

module.exports=router