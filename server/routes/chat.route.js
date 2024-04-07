const express = require("express");
const verifyToken = require("../utilities/jwtoken");
const { sendMessages, getMessages } = require("../controllers/chat.controller");


const router = express.Router();

router.post('/',verifyToken,sendMessages)
router.get('/:id',verifyToken,getMessages)


module.exports = router;