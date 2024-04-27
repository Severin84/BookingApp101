const express=require('express');
const { getAllData } = require('../controllers/DataBase');
const router=express.Router();

router.route("/allData").get(getAllData)

module.exports=router