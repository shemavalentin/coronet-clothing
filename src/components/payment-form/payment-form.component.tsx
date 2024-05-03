import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

// By using safeguard/ predicate

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    // Pevent typical form to be submitted
    e.preventDefault();

    // Making sure that the above two hooks are loaded in when payment handler fired
    if (!stripe || !elements) {
      return;
    }
    // setting processing payment to true when it stats to process payments

    setIsProcessingPayment(true);

    // Request to get the payment
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      //request: "no-cors",
      headers: {
        "Content-Type": "application/json", 
      },

      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    // casting card to not be null
    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement (cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    // set processing payments to false when it ends to process
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successfull");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
      <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
