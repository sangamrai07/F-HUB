import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js"
import { useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm.jsx';

const stripePromise = loadStripe("pk_test_51OtuvkHrwmP4EohTbiKdtmyZtxOWh0VTqqoCdzEONzSBRcDIebVWTNDZ1ttR1D5Rz5EQs3obEnNAhfjKjU0pCdxY00av1T0nlS")

function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async (req, res) => {
      try {
        const res = await newRequest.post(`orders/makePayment/${id}`)
        setClientSecret(res.data.clientSecret)
      }
      catch (err) {
        console.log(err)
      }
    }
    
    makeRequest()
  }, []);

    const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  
  return (
    <div className='payment'>
            {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}

    </div>
  )
}

export default Payment
