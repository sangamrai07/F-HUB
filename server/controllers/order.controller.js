const Order = require("../models/order")
const Gig = require("../models/gig.js");
const Stripe = require("stripe")



const getOrders = async (req, res) => {
    try {
    const orders = await Order.find({
      ...(req.isSeller ? { freelancerID: req.userId } : { buyerID: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
}

const paymentIntent = async (req, res)=>{
  try {
    const stripe = new Stripe(process.env.stripe_key);

    const gig = await Gig.findById(req.params.id);

    const payment = await stripe.paymentIntents.create({
      amount: gig.price * 100, // if you don't do *100 it's gonna calculate in cents not dollars
      currency: "usd",
       payment_method: 'pm_card_visa',
    });
    
     const newOrder = new Order({
    gigID: gig._id,
    image: gig.coverImg,
    title: gig.title,
    freelancerID: gig.userID ,
    buyerID: req.userId,
    price: gig.price,
    payment: payment.id,
    
         });
    await newOrder.save();
    
      res.status(200).send({
    clientSecret: payment.client_secret,
  });

}
  catch (err) {
    console.log(err)
  }
}

const confirmPayment = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
module.exports = {getOrders, paymentIntent, confirmPayment}