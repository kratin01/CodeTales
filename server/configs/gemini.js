// server/configs/gemini.js
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function generateWithGemini(prompt) {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt must be a non-empty string");
  }

 
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  // Some SDK versions return an object where .text() is a function
  // Others may have the text at response.text
  const text = typeof response.text === "function" ? response.text() : response.text;

  if (!text || typeof text !== "string") {
    throw new Error("Empty response from Gemini");
  }

  return text;
}
