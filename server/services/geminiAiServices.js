import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini client with API key
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCXnVwCHBhnBGBFBsSMw0-avPk2Y3IVmB0"
});

async function analyseJournal(text) {
  try {
    const prompt = `
      Analyze the following journal entry:
      "${text}"

      Respond in JSON format matching this structure exactly:
      {
        "sentiment": "positive | negative | neutral",
        "feedback": "one short feedback sentence"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // DEBUG: log raw response
    console.log("AI raw response:", response);

    // Safely extract the content from first candidate
    let rawText = "";
    if (response?.candidates?.length > 0) {
      const firstCandidate = response.candidates[0];
      rawText =
        typeof firstCandidate.content === "string"
          ? firstCandidate.content
          : JSON.stringify(firstCandidate.content);
    } else {
      rawText = "Unable to analyze";
    }

    rawText = rawText.trim();

    // Try parsing JSON
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (e) {
      parsed = { sentiment: "neutral", feedback: rawText };
    }

    console.log("AI analysis result:", parsed);
    return parsed;
  } catch (error) {
    console.error("AI analysis error:", error.message);
    return { sentiment: "neutral", feedback: "Unable to analyze journal entry." };
  }
}


export default analyseJournal;
