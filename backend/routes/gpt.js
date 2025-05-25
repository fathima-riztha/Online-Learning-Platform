const express = require("express");
const { getGptRecommendations } = require("../controllers/gptController");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

router.post("/recommendations", authMiddleware, getGptRecommendations);

module.exports = router;
