const express = require("express");
const { generateParagraphs } = require("../controllers/generatorController");

const router = express.Router();

// POST /api/generator
router.post("/", generateParagraphs);

module.exports = router;
