import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ItineraryResult, PlannerFormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: "A catchy title for the trip" },
    summary: { type: Type.STRING, description: "A brief inspiring summary of the trip" },
    budget: {
      type: Type.OBJECT,
      properties: {
        stay: { type: Type.STRING },
        travel: { type: Type.STRING },
        food: { type: Type.STRING },
        sightseeing: { type: Type.STRING },
        buffer: { type: Type.STRING },
        totalEstimate: { type: Type.STRING },
      },
      required: ["stay", "travel", "food", "sightseeing", "buffer", "totalEstimate"],
    },
    transport: {
      type: Type.OBJECT,
      properties: {
        mode: { type: Type.STRING, description: "Primary mode of transport to destination" },
        options: { type: Type.STRING, description: "Specific details (e.g., flight route)" },
        duration: { type: Type.STRING },
        approxCost: { type: Type.STRING },
      },
      required: ["mode", "options", "duration", "approxCost"],
    },
    accommodation: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING },
          approxCost: { type: Type.STRING },
          whyRecommended: { type: Type.STRING },
        },
        required: ["name", "type", "approxCost", "whyRecommended"],
      },
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          theme: { type: Type.STRING, description: "Theme of the day" },
          morning: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                location: { type: Type.STRING },
              },
              required: ["time", "activity", "location"],
            },
          },
          afternoon: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                location: { type: Type.STRING },
              },
              required: ["time", "activity", "location"],
            },
          },
          evening: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                location: { type: Type.STRING },
              },
              required: ["time", "activity", "location"],
            },
          },
          localTips: { type: Type.STRING },
        },
        required: ["day", "theme", "morning", "afternoon", "evening", "localTips"],
      },
    },
    practicalTips: {
      type: Type.OBJECT,
      properties: {
        weather: { type: Type.STRING },
        safety: { type: Type.STRING },
        packing: { type: Type.STRING },
      },
      required: ["weather", "safety", "packing"],
    },
  },
  required: ["tripTitle", "summary", "budget", "transport", "accommodation", "days", "practicalTips"],
};

export const generateItinerary = async (data: PlannerFormData): Promise<ItineraryResult> => {
  try {
    const prompt = `
      Act as a world-class senior travel consultant for Ezora Tours.
      Plan a detailed trip based on the following request:
      
      - Origin City: ${data.startCity}
      - Destination: ${data.destination}
      - Duration: ${data.days} days
      - Travelers: ${data.travelers} people
      - Budget: ${data.budget} (Total)
      - Travel Style: ${data.travelStyle}
      - Interests: ${data.interests}

      Constraints:
      1. Be realistic with travel times and costs.
      2. Budget breakdown must include specific estimates.
      3. Hotels should match the ${data.travelStyle} style.
      4. Activities must be logically ordered by location (distance-optimized).
      5. Provide clear, actionable advice.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
        systemInstruction: "You are EzoraAI, an expert travel architect. You provide structured, data-rich travel itineraries. Never output markdown, only valid JSON matching the schema.",
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ItineraryResult;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
};