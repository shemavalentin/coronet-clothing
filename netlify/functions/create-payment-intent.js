require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// old schooll ExpressJS function to handel payments

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    // Creating payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // Once payment process is done, then return an object

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
