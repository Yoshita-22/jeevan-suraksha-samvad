// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./SystemPrompt.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/ask", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { query, lang } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const finalPrompt = `${systemPrompt}\n\nUser question: ${query}`;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
    });

    const aiResponse = result.response.text();
    console.log("AI Response:", aiResponse);
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
