import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const explainConcept = async (concept: string, context: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert technical tutor for a student learning software engineering.
      The student is asking about: "${concept}".
      The context of their learning path is: "${context}".
      
      Please provide a concise, clear, and beginner-friendly explanation (max 150 words). 
      If applicable, provide a very short code snippet in the relevant language (Python for DSA, JS/TS for Web/Mobile).
      Focus on the "Why" and "How".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Tutor. Please check your API key or internet connection.";
  }
};
