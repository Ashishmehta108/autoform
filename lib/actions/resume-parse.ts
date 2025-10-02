import fs from "fs";
import pdf from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI! });

export const parseResume = async (pdfPath: string) => {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(pdfBuffer);
  const resumeText = pdfData.text;
  const prompt = `
  You are a resume parser. Extract the following details from the provided resume text:
  - Full Name
  - Email
  - Phone Number
  - Address (if available)
  - Education (degree, institution, years)
  - Work Experience (company, role, duration)
  - Skills
  - Certifications (if any)
  - Summary/Objective

  Return the result as a valid JSON object with these keys:
  { "name": "", "email": "", "phone": "", "address": "", "education": [], "experience": [], "skills": [], "certifications": [], "summary": "" }

  Resume Text:
  """${resumeText}"""
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { temperature: 0.2, thinkingConfig: { includeThoughts: false } },
  });

  const output = response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

  try {
    return JSON.parse(output);
  } catch (err) {
    console.error("Failed to parse AI response:", output);
    return { error: "Invalid JSON returned by AI", raw: output };
  }
};
