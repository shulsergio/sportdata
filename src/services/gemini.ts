'use server';

export async function askGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],

        tools: [{ google_search: {} }] 
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Детали ошибки:", data);
      return `error: ${data.error?.message || "Неизвестно"}`;
    }

    return data.candidates[0].content.parts[0].text;
  } catch (e) {
    return "error: " + (e as Error).message;
  }
}