const express = require("express");
const { createChat, getAllChat, getSingleChat, updateReadStatus } = require("../controllers/allChats.controller");
const verifyToken = require("../utilities/jwtoken");

const router = express.Router();

router.post("/",verifyToken, createChat)
router.get("/", verifyToken, getAllChat)
router.get("/singleChat/:id", verifyToken,getSingleChat)
router.put("/:id", verifyToken, updateReadStatus)

module.exports = router;