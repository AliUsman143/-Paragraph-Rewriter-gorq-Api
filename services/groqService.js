const apiClient = require("../utils/apiClient");

const callGroqAPI = async (prompt) => {
  const response = await apiClient.post("/chat/completions", {
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return response.data.choices[0].message.content;
};

module.exports = { callGroqAPI };
