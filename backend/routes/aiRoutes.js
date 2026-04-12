const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// ================= CHATBOT =================
router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are StudyHub AI assistant. Help students with DSA, DBMS, OS, CN and interview prep in short simple answers.Give SHORT, clear answers (3-5 lines max).Focus on important points only."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from AI", details: data });
    }

  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Chat failed" });
  }
});


// ================= INTERVIEW =================
router.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  try {
    const prompt = `
    Question: ${question}
    Answer: ${answer}
    Evaluate answer. Give correctness, score and feedback.
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res.json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from AI", details: data });
    }

  } catch (err) {
    console.error("Evaluation Error:", err);
    res.status(500).json({ error: "Evaluation failed" });
  }
});


// ✅ EXPORT AT END ONLY
module.exports = router;