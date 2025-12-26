"use client";

import { chatAction } from "@/src/services/actions";
import { useState } from "react";
// import { chatAction } from "../actions";

export default function FirstChat() {
  //   const [result, setResult] = useState("");
  const [result, setResult] = useState("");
  return (
    <div>
      <form
        action={async (formData) => {
          const res = await chatAction(formData);
          setResult(res);
        }}
      >
        <input name="message" />
        <button type="submit">Спросить</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}
