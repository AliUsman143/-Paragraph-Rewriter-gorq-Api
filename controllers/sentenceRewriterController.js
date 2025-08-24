// controllers/sentenceRewriterController.js
const { callGroqAPI } = require("../services/groqService");

// Modes -> specific instructions
const MODE_PROMPTS = {
  Simplify:
    "Rewrite the following sentence in simpler, plain language that is easy to understand. Keep the meaning the same. Only return the rewritten sentence. Keep it concise and roughly the same length.",
  Shorten:
    "Rewrite the following sentence in a shorter and more concise way without losing the key meaning. Only return the rewritten sentence.",
  Improver:
    "Rewrite the following sentence to improve grammar, clarity, and fluency while keeping the same meaning. Only return the rewritten sentence.",
  Randomizer:
    "Rewrite the following sentence in a creative, fresh, and unique way while preserving the meaning. Only return the rewritten sentence.",
};

function buildPrompt(mode, text) {
  const instruction =
    MODE_PROMPTS[mode] || MODE_PROMPTS.Improver; // default Improver
  // Optional hard guard so model doesn’t write paragraphs
  const lengthGuard =
    "Keep it a single sentence, not a paragraph. Do not add explanations or notes.";
  return `${instruction} ${lengthGuard}\n\n"${text}"`;
}

const rewriteSentence = async (req, res, next) => {
  try {
    const { text, mode } = req.body;

    // Basic validations
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "Text is required." });
    }

    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 3) {
      return res
        .status(400)
        .json({ error: "Please enter at least 3 words to rewrite." });
    }
    // (Optional) prevent paragraphs:
    if (wordCount > 60) {
      return res
        .status(400)
        .json({ error: "Please keep the sentence under 60 words." });
    }

    const prompt = buildPrompt(mode, text);

    const reply = await callGroqAPI(prompt);

    // Clean up common model artifacts (quotes, extra lines)
    const cleaned = reply
      .split(/\n+/)[0]           // first line only
      .replace(/^["'\s]+|["'\s]+$/g, "") // trim quotes/spaces
      .trim();

    return res.json({ rewritten: cleaned });
  } catch (err) {
    next(err);
  }
};

module.exports = { rewriteSentence };
