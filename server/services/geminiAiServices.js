import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini client with API key
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCXnVwCHBhnBGBFBsSMw0-avPk2Y3IVmB0"
});

// Analyse journal content with AI
async function analyseJournal(text) {
  try {
    const prompt = `
      Analyze the following journal entry:
      "${text}"

      Respond in **pure JSON** format matching this structure exactly:
      {
        "sentiment": "positive | negative | neutral",
        "feedback": "one short feedback sentence"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Extract model output as text
    const rawText = response.response.text().trim();

    // Try to parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      // Fallback if model didn’t return valid JSON
      parsed = { sentiment: "neutral", feedback: rawText };
    }

    return parsed;
  } catch (error) {
    console.error("AI analysis error:", error.message);
    return { sentiment: "neutral", feedback: "Unable to analyze journal entry." };
  }
}

export default analyseJournal;
