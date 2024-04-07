const Review = require("../models/review.js");
const Gig = require("../models/gig.js");
const review = require("../models/review.js");

const addReview = async (req, res) => {
    try {
        if (req.isSeller) {
            return res.status(403).send("Sellers can't create a review!");
        }

        const { gigID, description, ratingStars } = req.body;

        // Check if the required fields are present
        if (!gigID || !description || !ratingStars) {
            return res.status(400).send("Incomplete data provided.");
        }

        // Check if review already exists
        const existingReview = await Review.findOne({ gigID, userID: req.userId });
        if (existingReview) {
            return res.status(403).send("Review already exists for this user and gig.");
        }

        const newReview = new Review({
            userID: req.userId,
            gigID,
            description,
            ratingStars
        });

        // Save the new review
        const savedReview = await newReview.save();

        // Update Gig rating
        await Gig.findByIdAndUpdate(gigID, {
            $inc: { ratingStars, starNumber: 1 }
        });

        res.status(201).send(savedReview);
    } catch (err) {
        console.error("Error adding review:", err);
        res.status(500).send("Internal Server Error");
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ gigID: req.params.id });
        res.status(200).send(reviews);
    } catch (err) {
        console.error("Error getting reviews:", err);
        res.status(500).send("Internal Server Error");
    }
};

const deleteReview = async (req, res) => {
      try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).send("Review not found.");
        }

        if (req.userId !== review.userID.toString()) {
            return res.status(403).send("You aren't authorized");
        }

        await Review.findByIdAndDelete(req.params.id);
          res.status(200).send("Review Deleted Successfully!");
          
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the review.");
    }
};

const editReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        
        if (!review) {
            return res.status(404).send("Review not found.");
        }

        if (req.userId !== review.userID.toString()) {
            return res.status(403).send("You aren't authorized.");
        }

        const { description, ratingStars } = req.body;

        if (description) {
            review.description = description;
        }

        if (ratingStars) {
            review.ratingStars = ratingStars;
        }

        // Save the updated review
        await review.save();

        res.status(200).send("Review updated successfully.");
          
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while editing the review.");
    }
};


module.exports = { addReview, getReviews, deleteReview, editReview };
