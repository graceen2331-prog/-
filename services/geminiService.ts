import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const generateWebComponent = async (prompt: string): Promise<string> => {
  try {
    const ai = getClient();
    
    // We use gemini-3-flash-preview for speed and efficiency in generating code structures.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // Increase output limit to ensure full code is generated
        maxOutputTokens: 8192, 
        temperature: 0.7, // Balance between creativity and structure
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No content generated");
    }

    // Cleaning up if the model accidentally included markdown backticks despite instructions
    let cleanCode = text.trim();
    if (cleanCode.startsWith('```html')) {
      cleanCode = cleanCode.substring(7);
    } else if (cleanCode.startsWith('```')) {
      cleanCode = cleanCode.substring(3);
    }
    
    if (cleanCode.endsWith('```')) {
      cleanCode = cleanCode.substring(0, cleanCode.length - 3);
    }

    return cleanCode;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};