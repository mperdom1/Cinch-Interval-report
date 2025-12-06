import { GoogleGenAI } from "@google/genai";

export const generateWfmReport = async (stats: any, alerts: any) => {
  if (!process.env.API_KEY) {
      console.warn("API_KEY not found in environment.");
      return "Error: API Key is missing. Please check your configuration.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
  You are a Workforce Management (WFM) Senior Analyst. 
  Analyze the following current interval data and agent alerts. 
  Provide a professional, concise executive summary suitable for a chat message to operations leadership.
  Focus on:
  1. Attainment vs Requirement (Highlight over/under staffing).
  2. Critical alerts (agents in long duration break/ACW).
  3. Actionable recommendations.

  Data:
  ${JSON.stringify(stats)}

  Active Alerts:
  ${JSON.stringify(alerts)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to generate report. Please try again.";
  }
};
