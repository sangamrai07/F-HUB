const express = require("express");
const verifyToken = require("../utilities/jwtoken.js");
const router = express.Router();
const {getOrders, paymentIntent, confirmPayment} = require("../controllers/order.controller.js")

router.get("/", verifyToken, getOrders)
router.post("/makePayment/:id", verifyToken, paymentIntent);
router.put("/", verifyToken, confirmPayment);
module.exports = router;