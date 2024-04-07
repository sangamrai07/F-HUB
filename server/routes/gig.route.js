const express = require("express");
const {createGig,deleteGig,getAllGigs,getSingleGig, editGig} = require("../controllers/gig.controller.js");
const verifyToken = require("../utilities/jwtoken.js");

const router = express.Router();

router.post("/",verifyToken,createGig)
router.delete("/:id", verifyToken, deleteGig)
router.get("/", getAllGigs)
router.get("/singleGig/:id", getSingleGig)
router.put("/:id",verifyToken, editGig)

module.exports = router;