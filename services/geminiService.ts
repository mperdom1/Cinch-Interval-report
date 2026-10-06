import { GoogleGenAI } from "@google/genai";

export const generateWfmReport = async (stats: any, alerts: any) => {
  // La clave de Gemini NO debe ir en el navegador. Esta función está desactivada
  // hasta que se mueva a una función del servidor (api/).
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
      console.warn("VITE_GEMINI_API_KEY no está definida; el reporte con IA está desactivado.");
      return "Error: el reporte con IA no está configurado.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
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
