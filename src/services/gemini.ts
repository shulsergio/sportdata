'use server';

export async function askGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  //гемини 3.0 -- 
 // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // next: { revalidate: 3600 },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }], // Google !!!!

      })
    });

    const data = await response.json();

if (!response.ok) {
  return JSON.stringify({ error: data.error?.message || "Ошибка API" });
}

// ПРОВЕРКА: Если кандидатов нет, возвращаем пустой массив, чтобы .parse() не упал
if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
  console.error("Джадес не нашла данных:", data);
  return "[]"; // Возвращаем пустой JSON массив
}

return data.candidates[0].content.parts[0].text;
  } catch (e) {
   return JSON.stringify({ error: (e as Error).message });
  }
}

export async function askGeminiData(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // next: { revalidate: 3600 },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        // tools: [{ google_search: {} }], 

      })
    });

    const data = await response.json();

if (!response.ok) {
  return JSON.stringify({ error: data.error?.message || "Ошибка API" });
}

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
  console.error("Джадес не нашла данных:", data);
  return "[]"; 
}

return data.candidates[0].content.parts[0].text;
  } catch (e) {
   return JSON.stringify({ error: (e as Error).message });
  }
}


//--------------------------
//--------------------------
 
/**
 * Service to fetch and store the complete tournament standings for all groups (A through L).
 * This service focuses on retrieving high-fidelity data via Google Search grounding.
 */

// import { GoogleGenAI } from "@google/genai";

// export interface TeamStats {
//   rank: number;
//   team: string;
//   played: number;
//   won: number;
//   drawn: number;
//   lost: number;
//   gf: number;
//   ga: number;
//   gd: number;
//   points: number;
// }

// export interface GroupStandings {
//   groupName: string;
//   teams: TeamStats[];
// }

// export const updateTournamentStandings = async (): Promise<GroupStandings[]> => {

//   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//  const prompt = `
//     Retrieve the current official standings for the FIFA World Cup (including Qualifiers or the upcoming 2026 structure if applicable).
//     I need a complete list of all groups from Group A to Group L.
//     For each group, provide the full table: Rank, Team Name, Matches Played, Won, Drawn, Lost, Goals For, Goals Against, Goal Difference, and Points.
//     Ensure the data is the most recent available.
//   `;
//  try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//       config: {
//         tools: [{ googleSearch: {} }],
 
//       }
//     });

//     const rawText = response.text();
 
//     const cleanJsonText = rawText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();
 
//     const data = JSON.parse(cleanJsonText);
    
//     const structuredStandings: GroupStandings[] = data.allGroups;
//     console.log("Full World Cup Standings Updated:", structuredStandings);
    
//     return structuredStandings;

//   } catch (error) {
//     console.error("Error updating tournament standings:", error);
//     return [];
//   }
// };