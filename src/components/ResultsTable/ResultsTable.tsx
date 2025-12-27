"use client";

import React, { useState } from "react";
import css from "./ResultsTable.module.css";
import ButtonBox from "../ButtonBox/ButtonBox";
import { askGemini } from "@/src/services/gemini";

export default function ResultsTable() {
  const [tableData, setTableData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  //   setIsLoading(true);
  const handleGetTable = async () => {
    setIsLoading(true);
    try {
      const query =
        "Используй Google Search и выведи текущую таблицу Серии А сезона 2025/2026. Не пиши оправданий, просто найди актуальные данные и покажи полную турнирную таблицу Серии А в виде таблицы с командами, сыгранными матчами, победами, ничьими, поражениями, забитыми и пропущенными голами, а также очками, используя спортивные сайты вроде Flashscore или LiveScore";
      const response = await askGemini(query);
      console.log("!!!response ResultsTable :", response);
      //   console.log("!!!response ResultsTable :", response.toJSON());
      setTableData(response);
    } catch (error) {
      setTableData("Ошибка: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="button">
        <ButtonBox onClick={handleGetTable} type="button">
          {isLoading ? "Загрузка..." : "Seria A Table"}
        </ButtonBox>
      </div>
      {tableData && (
        <div className={css.resultsWrapper}>
          <h3>Турнирная таблица</h3>
          {/* pre-wrap сохранит форматирование таблицы, которое пришлет ИИ */}
          <div className={css.tableContent} style={{ whiteSpace: "pre-wrap" }}>
            {tableData}
          </div>
        </div>
      )}
    </>
  );
}
