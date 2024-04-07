import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from "../../utils/newRequest.js";

function PaymentSuccess() {

  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  return (
    <div>
      You're being redirected to Order page.
    </div>
  )
}

export default PaymentSuccess
