const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Chatbot
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chat failed" });
  }
});

// Interview
router.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  try {
    const prompt = `
    Question: ${question}
    Answer: ${answer}
    Evaluate answer. Give correctness, score and feedback.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Evaluation failed" });
  }
});

module.exports = router;