const express=require('express');
const stripe=require('stripe')('sk_test_51OSPOtSCpvXYxeMvLEHkNkQmn71rLsqIPZIe5hbMVXtAEGEGaiywzJbsMnw4CICCJvFfRbbqFCgPMle7G9nZwW1m00OS6SeXjl');
const {v4 : uuidv4} = require("uuid")

const createpaymentIntent=async(req,res,next)=>{
  const {product,token}=req.body;
  const idempotencyKey=uuidv4();
  try{
     console.log(product);
     console.log(token);
     const paymentIntent=await stripe.paymentIntents.create({
       product,
       currency:'usd',
       payment_method:token.id,
       confirm:true,
     })
     console.log("Here")
     res.json({client_secret:paymentIntent.client_secret})
  }catch(error){
    res.status(500).json({error:"Internal server Error"})
  }
}

module.exports={
  createpaymentIntent
}