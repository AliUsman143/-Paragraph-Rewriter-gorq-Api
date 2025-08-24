const { callGroqAPI } = require("../services/groqService");

// Tone templates
const toneTemplates = {
  Formal: "Write in a formal and professional tone.",
  Informal: "Write in a casual and friendly tone.",
  Professional: "Write in a corporate and polished tone.",
  Diplomatic: "Write in a respectful and diplomatic tone.",
  Academic: "Write in an academic and scholarly tone.",
  Simplified: "Write in a simple, easy-to-understand tone.",
  Persuasive: "Write in a persuasive and convincing tone."
};

// Length templates
const lengthTemplates = {
  Default: "Keep the paragraph at a normal length.",
  Concise: "Keep the paragraph short and concise.",
  Detailed: "Make the paragraph detailed and comprehensive."
};

const generateParagraphs = async (req, res, next) => {
  try {
    const { topic, tone, length, paragraphs } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // Tone & length prompt parts
    const toneInstruction = toneTemplates[tone] || toneTemplates["Formal"];
    const lengthInstruction = lengthTemplates[length] || lengthTemplates["Default"];

    // Number of paragraphs (default 1, max 20)
    const paraCount = paragraphs && paragraphs > 0 ? Math.min(paragraphs, 20) : 1;

    // Final prompt
    const prompt = `Generate ${paraCount} paragraph(s) about the topic: "${topic}". 
    ${toneInstruction} ${lengthInstruction} 
    Ensure each paragraph starts on a new line and content is original.`;

    const response = await callGroqAPI(prompt);

    // Split into array of paragraphs
    const formatted = response
      .split(/\n+/)
      .filter(p => p.trim() !== "")
      .map(p => p.trim());

    res.json({
      topic,
      tone,
      length,
      paragraphs: paraCount,
      content: formatted
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateParagraphs };
