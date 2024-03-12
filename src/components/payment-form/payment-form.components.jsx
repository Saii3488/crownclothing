import { useState } from "react";
import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import {selectCartTotal} from '../../store/cart/cart.selector'
import {selectCurrentUser} from '../../store/user/user.selector'
import {BUTTON_TYPE_CLASSES} from "../button/button-components";
import { PaymentFormContainer,FormContainer,PaymentButton } from "./payment-form.styles";
import axios from "axios";
const PaymentForm=()=>{
    const stripe=useStripe()
    const elements=useElements()
    const currentUser=useSelector(selectCurrentUser)
    const amount=useSelector(selectCartTotal)
    const[isProcessingPayment,setIsProcessingPayment]=useState(false)
    const PaymentHandler=async(e)=>{
     e.preventDefault();
     if(!stripe || !elements){
        return;
     }
     setIsProcessingPayment(true)
     const response=await fetch('/.netlify/functions/create-payment-intent',{
      method:'post',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({amount:amount*100})
     }).then((res) => {
      
      return res.json();
    });

     const{
      paymentIntent:{client_secret},
     }=response
     console.log(response)
     const paymentResult=await stripe.confirmCardPayment(client_secret,{
      payment_method:{
        card:elements.getElement(CardElement),
        billing_details:{
          name:currentUser?currentUser.displayName:'Guest',
        },

      }
     })
     setIsProcessingPayment(false)
     if(paymentResult.error){
      alert(paymentResult.error)
     }else{
      if(paymentResult.paymentIntent.status === "succeeded"){
        alert('payment successful')
      }
     }
    }
    return(
        <PaymentFormContainer>
          <FormContainer onSubmit={PaymentHandler}>
           <h2>Credit Card Payment:</h2>
           <CardElement />
           <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
          </FormContainer>
        </PaymentFormContainer>
    )
}
export default PaymentForm