"use client";
// const today = new Date().toLocaleDateString("ru-RU", {
//   day: "numeric",
//   month: "long",
//   year: "numeric",
// });

// const query = `Найди результат последних пяти матчей Ювентуса.
// Выведи ответ СТРОГО в формате массива объектов JSON.
// Не пиши никакого лишнего текста, пояснений или Markdown-разметки.
// Только массив объектов JSON.
// Поля: "team_home", "team_away", "score_home", "score_away", "date"`;
//-------  //-------
// const query = `Найди даты будущих пяти матчей Ювентуса.
// Выведи ответ СТРОГО в формате массива объектов JSON.
// Не пиши никакого лишнего текста, пояснений или Markdown-разметки.
// Только массив объектов JSON.
// Поля: "team_home", "team_away", "date"`;
//------- //-------

// const query = `Найди данные турнирной таблицы Серии А 2025/26 на сегодняшний день и выведи с 1 по 20 место.
// Не пиши размышления или пояснения, выводи только таблицу в формате Markdown.
// ПРОВЕРКА: Убедись, что в списке нет команд из Серии Б (например, Фрозиноне или Салернитаны). Если ты видишь их в результатах поиска— значит данные устарели, ищи дальше.
// | Rank | Team | Game | Win | Draw | Loss | Points |
// `;

// const query2 = `Найди данные турнирной таблицы Серии А 2025/26 на сегодняшний день и выведи с 11 по 20 место.
// Не пиши размышления или пояснения, выводи только таблицу в формате Markdown.
// ПРОВЕРКА: Убедись, что в списке нет команд из Серии Б (например, Фрозиноне или Салернитаны). Если ты видишь их в результатах поиска— значит данные устарели, ищи дальше.
//   | Rank | Team | Game | Win | Draw | Loss | Points |`;
//------- //-------
// ACT AS A PROFESSIONAL SPORTS DATA ANALYST.
// DATE: ${new Date().toLocaleDateString("ru-RU")}.

//////////////////// WORK!!!!/////

const query = `
TASK:
Create a list of football clubs: exactly 2 clubs (not only famous clubs) for each of the following 20 countries: England, Spain, Italy, Portugal, Ukraine, Germany, Ireland, Iceland, North Macedonia, Turkey, Poland, France, Austria, Argentina, Brazil, Paraguay, Uruguay, China, Japan, Australia.
The response must be STRICTLY in JSON format as an array of objects. Do not include any introductory text, markdown formatting, or explanations.Use English for all country and club names.
Structure: [ { "country": "Country Name", "club": "Club Name" } ]
`;
//////////////////// WORK!!!!/////

// const query = `
//   ACT AS A PROFESSIONAL SPORTS ANALYST.
//   TASK: Provide the current standings/teams for ALL 12 groups (A-L) of FIFA World Cup 2026.
//   CROSS-REFERENCE with FIFA.com.

//   FORMAT:
//   Strictly JSON array of objects. No Markdown code blocks, no text, just the array.

//   STRUCTURE:
//   [
//     {
//       "group": "A",
//       "teams": [
//         {"rank": 1, "team": "USA", "points": 0, "played": 0, "win": 0, "draw": 0, "loss": 0},
//         ...
//       ]
//     },
//     ...
//   ]

//   STRICT RULES:
//   - Return ONLY the JSON array.
//   - No explanations or preamble.
//   - If matches haven't started, set all numeric values to 0.
//   - Accuracy is top priority.
// `;

// const query = `
// Сегодня ${today}. Используй Google Search, чтобы найти результаты завершившегося тура Серии А.
//   Ориентируйся на данные с legaseriea.it или flashscore.com.

//   ИНСТРУКЦИЯ:
//   1. Сначала определи номер последнего сыгранного тура.
//   2. Собери все матчи этого конкретного тура.
//   3. Сформируй ответ СТРОГО в формате массива JSON.

//   СТРОГИЕ ПРАВИЛА:
//   - Никакого текста, только массив [].
//   - Никакой разметки \`\`\`json.
//   - Если счет матча еще неизвестен (матч не сыгран), не включай его в массив.
//   - Названия команд пиши на английском (например, "Juventus", "Inter").

//   ПОЛЯ ОБЪЕКТА:
//   "team_home", "team_away", "score_home", "score_away", "date"
// `;

import React, { useState } from "react";
// import css from "./SeriaA.module.css";
import ButtonBox from "../ButtonBox/ButtonBox";
import { askGeminiData } from "@/src/services/gemini";
// import { updateTournamentStandings } from "@/src/services/gemini";

interface TeamData {
  team: string;
  country: string;
}

export default function FootballQuiz() {
  // const [teams, setTeams] = useState<TeamData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleGetTable = async () => {
    setIsLoading(true);

    try {
      const response = await askGeminiData(query);
      console.log("DATA response:", response);

      const cleanJson = response.replace(/```json|```/g, "").trim();
      const data: TeamData[] = JSON.parse(cleanJson);
      // setTeams(data);
      console.log("TEAMS data:", data);
    } catch (error) {
      console.error("Ошибка парсинга:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className={css.container}>
    <div className="button">
      <ButtonBox onClick={handleGetTable} type="button">
        {isLoading ? "Загрузка..." : "Data Clubs List"}
      </ButtonBox>
    </div>
    // </div>
  );
}
