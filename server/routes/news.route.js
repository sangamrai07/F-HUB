const express = require("express");
const verifyToken = require("../utilities/jwtoken.js");
const { createNews, deleteNews, getAllNews, getSingleNews, editNews } = require("../controllers/news.controller.js");

const router = express.Router();

router.post("/",verifyToken,createNews)
router.delete("/:id", verifyToken, deleteNews)
router.get("/", getAllNews)
router.get("/singleNews/:id", getSingleNews)
router.put("/:id",verifyToken, editNews)

module.exports = router;