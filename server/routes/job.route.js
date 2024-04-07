const express = require("express");
const verifyToken = require("../utilities/jwtoken.js");
const { getAllJobs, deleteJob, createJob, getSingleJob } = require("../controllers/job.controller.js");

const router = express.Router();

router.post("/",verifyToken,createJob)
router.delete("/:id", verifyToken, deleteJob)
router.get("/", getAllJobs)
router.get("/singleJob/:id", getSingleJob)

module.exports = router;