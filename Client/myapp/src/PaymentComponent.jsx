import React,{useState} from 'react'
import {CardElement,useStripe,useElements,CardInputWrapper,CardNumberElement} from "@stripe/react-stripe-js"
const PaymentComponent = ({amount}) => {
   const stripe=useStripe();
   const elements=useElements();
   const [error,setError]=useState(null) 

   const handleSubmit=async(event)=>{
     event.preventDefault()
     const {token,error}=await stripe.createToken(elements.getElement(CardElement));
     if(error){
      console.log(error);
      setError('Payment Failed')
     }else{
        console.log('1')
       const response=await fetch('http://localhost:5000/api/payment',{
        method:"POST",
        headers:{
           'Content-Type':'application/json',
        },
        body:JSON.stringify({amount})
       })
       console.log('2')
       const {clientSecret}=await response.json();
       console.log('3')
       const result=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{card:elements.getElement(CardElement),
        billing_details:{

        }}
       })
      console.log('4')
       if(result.error){
         console.log(result.error);
         setError('Payment failed')
       }else if(result.paymentIntent.status==='succeeded'){
        setError(null);
       }
       console.log('5')
     }
   }
  const inputStyle={
  iconColor:'#c4f0ff',
  color:'#ff0',
  fontWeight:'500',
  fontFamily:"Roboto, Open Sans,Segoe UI,sans-serif",
  fontSize:'16px',
  fontSmoothing:'antialiased',
  ':-webkit-autofill':{
    color:'#fce883',
  },
  '::placeholder':{
    color:'#87BBFD'
  },
}
  return (
    <div style={{display:"flex", flexDirection:"column", height:"7rem"}}>
    <form onClick={()=>handleSubmit()}>
      
      <CardInputWrapper>
        <CardNumberElement options={{style:{base:inputStyle,}}}/>
      </CardInputWrapper>
        <button type="submit" disabled={!stripe}>
            Pay ${amount}
        </button>
        {error && <div>{error}</div>}
    </form>
    </div>
  )
}


export default PaymentComponent