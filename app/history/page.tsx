"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    setHistory(savedHistory.reverse());
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <h1>実行履歴</h1>

      <button
        onClick={() => router.push("/today")}
      >
        ← 戻る
      </button>

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "12px",
          }}
        >
          <p>{item.date}</p>
          <p>{item.title}</p>

          {item.bench && (
            <p>ベンチ: {item.bench}kg</p>
          )}

          {item.squat && (
            <p>スクワット: {item.squat}kg</p>
          )}

          {item.deadlift && (
            <p>デッド: {item.deadlift}kg</p>
          )}

          {item.pullup && (
            <p>懸垂: {item.pullup}回</p>
          )}
        </div>
      ))}
    </main>
  );
}