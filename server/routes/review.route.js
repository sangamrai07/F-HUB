const express = require("express");
const verifyToken = require("../utilities/jwtoken.js");
const { addReview, getReviews, deleteReview, editReview } = require("../controllers/review.controller.js")


const router = express.Router();

router.post("/", verifyToken, addReview)
router.get("/:id", getReviews)
router.delete("/:id", verifyToken, deleteReview)
router.patch("/:id", verifyToken, editReview)

module.exports = router;