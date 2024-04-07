const express = require("express");
const { deleteUser, displayUser } = require("../controllers/user.controller.js");
const verifyToken = require("../utilities/jwtoken.js");
const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", displayUser);
module.exports = router;

