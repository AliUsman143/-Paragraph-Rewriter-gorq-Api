const express = require("express");
const { chatWithGroq } = require("../controllers/groqController");

const router = express.Router();

// POST /api/groq/chat
router.post("/chat", chatWithGroq);

module.exports = router;
