"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [benchMax, setBenchMax] = useState("");
  const [squatMax, setSquatMax] = useState("");
  const [deadliftMax, setDeadliftMax] = useState("");
  const [pullupReps, setPullupReps] = useState("12");
  const [goal, setGoal] = useState("strength");
  const [days, setDays] = useState<string[]>([]);
  const weekDays = [
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
    "日",
  ];

  const toggleDay = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };
  useEffect(() => {

    const savedBenchMax = localStorage.getItem("benchMax");
    const savedSquatMax = localStorage.getItem("squatMax");
    const savedDeadliftMax = localStorage.getItem("deadliftMax");
    const savedGoal = localStorage.getItem("goal");
    const savedDays = localStorage.getItem("days");
    const savedPullupReps = localStorage.getItem("pullupReps");


    if (savedBenchMax) setBenchMax(savedBenchMax);
    if (savedSquatMax) setSquatMax(savedSquatMax);
    if (savedDeadliftMax) setDeadliftMax(savedDeadliftMax);
    if (savedGoal) setGoal(savedGoal);

    if (savedDays) {
      setDays(JSON.parse(savedDays));
    }
    if (savedPullupReps) {
      setPullupReps(savedPullupReps);
    }
  }, []);


  function saveAndGoNext() {
    if (days.length !== 2 && days.length !== 3) {
      alert("曜日は2日または3日選択してください");
      return;
    }
    localStorage.setItem("benchMax", benchMax);
    localStorage.setItem("squatMax", squatMax);
    localStorage.setItem("deadliftMax", deadliftMax);
    localStorage.setItem("pullupReps", pullupReps);

    localStorage.setItem("goal", goal);

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

      <p>懸垂回数</p>
      <input
        value={pullupReps}
        onChange={(e) => setPullupReps(e.target.value)}
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


      <h2>トレーニング曜日</h2>

      {weekDays.map((day) => (
        <label
          key={day}
          style={{
            display: "inline-block",
            marginRight: "12px",
          }}
        >
          <input
            type="checkbox"
            checked={days.includes(day)}
            onChange={() => toggleDay(day)}
          />
          {day}
        </label>
      ))}

      <br />
      <br />

      <button onClick={saveAndGoNext}>メニュー作成</button>
    </main>
  );
}