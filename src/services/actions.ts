'use server';
import { askGemini } from "./gemini";

// import { askGemini } from "@/services/gemini";

export async function handleSearch(formData: FormData) {
  const query = formData.get("query") as string;
  const answer = await askGemini(query);
  return answer;
}

export async function chatAction(formData: FormData) {
  const message = formData.get("message") as string;
  // console.log('', message);
  if (!message) return "Пустое сообщение...";

  try {
    const response = await askGemini(message);
    return response;
  } catch (e) {
    return "Ошибка связи (Gemini): " + (e as Error).message;
  }
}