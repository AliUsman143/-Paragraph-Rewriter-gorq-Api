const { callGroqAPI } = require("../services/groqService");

// ✅ Templates object with concise fix
const promptTemplates = {
  Fluent: `Rewrite the following paragraph to make it more fluent and flow naturally while preserving the original meaning. Make it smooth and easy to read. Keep it concise and similar in length to the original. Only return the rewritten text:\n\n"{text}"`,

  Formal: `Rewrite the following paragraph in a more formal and professional tone while preserving the original meaning. Use formal language and structure. Keep the rewritten text concise and roughly the same length as the original. Only return the rewritten text:\n\n"{text}"`,

  Innovative: `Rewrite the following paragraph in a creative and innovative way while preserving the original meaning. Be creative with word choice and sentence structure, but keep it concise and not longer than the original. Only return the rewritten text:\n\n"{text}"`,

  Coherent: `Rewrite the following paragraph to improve its coherence and logical flow while preserving the original meaning. Ensure ideas connect smoothly. Keep the rewritten text concise and roughly the same length as the original. Only return the rewritten text:\n\n"{text}"`,

  Academic: `Rewrite the following paragraph in an academic style suitable for scholarly papers while preserving the original meaning. Use academic vocabulary and formal structure. Keep the rewritten text concise and roughly the same length as the original. Only return the rewritten text:\n\n"{text}"`,

  Normal: `Rewrite the following paragraph to improve its clarity and readability while preserving the original meaning. Keep the rewritten text concise and similar in length to the original. Only return the rewritten text:\n\n"{text}"`,
};

// ✅ Function for prompt generation
function getPrompt(style, text) {
  const template = promptTemplates[style] || promptTemplates["Normal"];
  return template.replace("{text}", text);
}

const chatWithGroq = async (req, res, next) => {
  try {
    const { text, style } = req.body;

    // ✅ Validation: text required
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // ✅ Validation: at least 20 words
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount < 20) {
      return res.status(400).json({ error: "Please enter at least 20 words to rewrite." });
    }

    // ✅ Generate prompt
    const prompt = getPrompt(style, text);

    const response = await callGroqAPI(prompt);
    res.json({ reply: response });
  } catch (error) {
    next(error);
  }
};

module.exports = { chatWithGroq };