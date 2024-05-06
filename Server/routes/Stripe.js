const express=require('express');
const router=express.Router();
const  {createpaymentIntent}=require('../controllers/Stripe.js')

router.route("/payment").get(createpaymentIntent)

module.exports=router