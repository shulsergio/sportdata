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

const today = new Date().toLocaleDateString("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const query = `
TASK:
  Provide the current Serie A 2025/26 standings for ranks 1 to 20, add also last played matches in today's date ${today}.
  CROSS-REFERENCE data ONLY in official sites https://en.legaseriea.it/serie-a/standings and https://www.flashscore.com/football/italy/serie-a to ensure accuracy.

FORMAT:
  Strictly RAW JSON array of objects only.
  No markdown code blocks (NO \`\`\`json). No preamble.

  STRUCTURE EXAMPLE:
  [
    {
      "rank": 1,
      "team": "Inter",
      "points": 33,
      "game": 15,
      "win": 11,
      "draw": 0,
      "loss": 4
    }
  ]

  STRICT RULES:
  - All numeric values (rank, points, game, win, draw, loss) must be Numbers, NOT Strings.
  - Accuracy is top priority.
  - No conversational text.
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
import css from "./SeriaA.module.css";
import ButtonBox from "../ButtonBox/ButtonBox";
import { askGemini } from "@/src/services/gemini";
// import { updateTournamentStandings } from "@/src/services/gemini";

interface TeamData {
  rank: number;
  team: string;
  points: number;
  game: number;
  win: number;
  draw: number;
  loss: number;
}

export default function ResultsTable() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleGetTable = async () => {
    setIsLoading(true);

    try {
      const response = await askGemini(query);
      console.log("response:", response);

      const cleanJson = response.replace(/```json|```/g, "").trim();
      const data: TeamData[] = JSON.parse(cleanJson);
      setTeams(data);
    } catch (error) {
      console.error("Ошибка парсинга:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <div className="button">
        <ButtonBox onClick={handleGetTable} type="button">
          {isLoading ? "Загрузка..." : "Seria A Table"}
        </ButtonBox>
      </div>
      {teams.length > 0 && (
        <div className={css.tableWrapper}>
          <table className={css.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>P</th>
                <th>G</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((item) => (
                <tr key={item.team} className={item.team}>
                  <td>{item.rank}</td>
                  <td className={css.teamName}>{item.team}</td>
                  <td className={css.points}>{item.points}</td>
                  <td>{item.game}</td>
                  <td>{item.win}</td>
                  <td>{item.draw}</td>
                  <td>{item.loss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
