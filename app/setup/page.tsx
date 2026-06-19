"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [benchMax, setBenchMax] = useState("");
  const [squatMax, setSquatMax] = useState("");
  const [deadliftMax, setDeadliftMax] = useState("");

  function saveAndGoNext() {
    localStorage.setItem("benchMax", benchMax);
    localStorage.setItem("squatMax", squatMax);
    localStorage.setItem("deadliftMax", deadliftMax);
    router.push("/today");
  }

  return (
    <main>
      <h1>目標設定</h1>

      <p>ベンチプレスMAX</p>
      <input value={benchMax} onChange={(e) => setBenchMax(e.target.value)} />

      <p>スクワットMAX</p>
      <input value={squatMax} onChange={(e) => setSquatMax(e.target.value)} />

      <p>デッドリフトMAX</p>
      <input
        value={deadliftMax}
        onChange={(e) => setDeadliftMax(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveAndGoNext}>メニュー作成</button>
    </main>
  );
}