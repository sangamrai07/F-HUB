const Job = require("../models/job.js")

const createJob = async (req, res) => {
    if (req.isSeller) { return res.status(403).send("This feature is for buyers only."); }

    const newJob = new Job({
        ...req.body
    });

   try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
} catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message }); 
}

};

const deleteJob = async (req, res) => {
    try {
        // Check if the gig exists
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).send('Gig does not exist.');
        }

        // Check if the user owns the gig
        if (job.userID !== req.userId) {
            return res.status(403).send('You do not own this gig.');
        }

        // Delete the gig
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig deleted successfully.");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error Occurred: " + err);
    }
};

const getAllJobs = async (req, res) => {
  const q = req.query;

  const filters = {
    ...(q.userID && { userID: q.userID })
  };

 
try {
  const gigs = await Job.find(filters)
  return res.status(200).send(gigs); 
} catch (err) {
  console.error(err);
  return res.status(500).send("Internal Server Error");
}
};




const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).send("Gig not found.");
    }
    res.status(200).send(job);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send("Invalid gig ID.");
    } else {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
};


module.exports = {createJob, deleteJob, getAllJobs, getSingleJob}