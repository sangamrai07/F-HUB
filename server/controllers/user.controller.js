const User = require('../models/user.js');
const jwt = require('jsonwebtoken')
const Gig = require('../models/gig.js')

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send("User not found.");
        }

        if (req.userId !== user._id.toString()) {
            return res.status(403).send("You aren't the owner of this account.");
        }

      await User.findByIdAndDelete(req.params.id);
       await Gig.deleteMany({ userID: req.params.id });
        res.status(200).send("User Deleted Successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while deleting the user.");
    }
}

const displayUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the user.");
  }
};

module.exports = { deleteUser, displayUser };