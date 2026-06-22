"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [benchMax, setBenchMax] = useState("");
  const [squatMax, setSquatMax] = useState("");
  const [deadliftMax, setDeadliftMax] = useState("");
  const [goal, setGoal] = useState("strength");
const [frequency, setFrequency] = useState("3");
const [days, setDays] = useState<string[]>([]);
useEffect(() => {
  const savedBenchMax = localStorage.getItem("benchMax");
  const savedSquatMax = localStorage.getItem("squatMax");
  const savedDeadliftMax = localStorage.getItem("deadliftMax");
  const savedGoal = localStorage.getItem("goal");
  const savedFrequency = localStorage.getItem("frequency");

  if (savedBenchMax) setBenchMax(savedBenchMax);
  if (savedSquatMax) setSquatMax(savedSquatMax);
  if (savedDeadliftMax) setDeadliftMax(savedDeadliftMax);
  if (savedGoal) setGoal(savedGoal);
  if (savedFrequency) setFrequency(savedFrequency);
}, []);
const [checkedItems, setCheckedItems] = useState<string[]>([]);

function saveAndGoNext() {
  localStorage.setItem("benchMax", benchMax);
  localStorage.setItem("squatMax", squatMax);
  localStorage.setItem("deadliftMax", deadliftMax);

  localStorage.setItem("goal", goal);
  localStorage.setItem("frequency", frequency);

  localStorage.setItem("days", JSON.stringify(days));

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
      <p>目標</p>

<label>
  <input
    type="radio"
    name="goal"
    value="strength"
    checked={goal === "strength"}
    onChange={(e) => setGoal(e.target.value)}
  />
  重量更新
</label>

<br />

<label>
  <input
    type="radio"
    name="goal"
    value="maintain"
    checked={goal === "maintain"}
    onChange={(e) => setGoal(e.target.value)}
  />
  維持
</label>

<br />

<label>
  <input
    type="radio"
    name="goal"
    value="diet"
    checked={goal === "diet"}
    onChange={(e) => setGoal(e.target.value)}
  />
  減量
  
</label>
<p>頻度</p>

<label>
  <input
    type="radio"
    name="frequency"
    value="2"
    checked={frequency === "2"}
    onChange={(e) => setFrequency(e.target.value)}
  />
  週2回
</label>

<br />

<label>
  <input
    type="radio"
    name="frequency"
    value="3"
    checked={frequency === "3"}
    onChange={(e) => setFrequency(e.target.value)}
  />
  週3回
</label>
      <br />
      <br />

      <button onClick={saveAndGoNext}>メニュー作成</button>
    </main>
  );
}