// routes/sentenceRewriterRoutes.js
const express = require("express");
const { rewriteSentence } = require("../controllers/sentenceRewriterController");

const router = express.Router();

// POST /api/sentence/rewrite
router.post("/rewrite", rewriteSentence);

module.exports = router;
