import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";

const stripePromise = loadStripe(
  "pk_test_51IeGAtHCo9A7jy27XPZM9atry5oeYI1LTwoeWBTN27159qurEdhs2LWdPPdZnmqP5W2j9SrXoZpkahRHYslpplrb001U80gqHq"
);

const ProcessPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
