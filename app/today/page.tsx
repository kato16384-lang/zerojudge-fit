"use client";

import { useEffect, useState } from "react";

export default function TodayPage() {
  const [benchMax, setBenchMax] = useState(0);
  const [squatMax, setSquatMax] = useState(0);
  const [deadliftMax, setDeadliftMax] = useState(0);
  const [day, setDay] = useState(1);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [pullupReps, setPullupReps] = useState(10);

 useEffect(() => {
  const savedBenchMax = localStorage.getItem("benchMax");
  const savedSquatMax = localStorage.getItem("squatMax");
  const savedDeadliftMax = localStorage.getItem("deadliftMax");
  const savedDay = localStorage.getItem("day");
  const savedCheckedItems = localStorage.getItem("checkedItems");
  const savedPullupReps = localStorage.getItem("pullupReps");

  if (savedBenchMax) setBenchMax(Number(savedBenchMax));
  if (savedSquatMax) setSquatMax(Number(savedSquatMax));
  if (savedDeadliftMax) setDeadliftMax(Number(savedDeadliftMax));
  if (savedDay) setDay(Number(savedDay));

  if (savedCheckedItems) {
    setCheckedItems(JSON.parse(savedCheckedItems));
  }
  if (savedPullupReps) {
  setPullupReps(Number(savedPullupReps));
}
}, []);

 const benchWeight = Math.round(benchMax * 0.85);
const squatWeight = Math.round(squatMax * 0.85);
const deadliftWeight = Math.round(deadliftMax * 0.85);

const toggleItem = (item: string) => {
  let updatedItems: string[];

  if (checkedItems.includes(item)) {
    updatedItems = checkedItems.filter((i) => i !== item);
  } else {
    updatedItems = [...checkedItems, item];
  }

  setCheckedItems(updatedItems);
  localStorage.setItem(
    "checkedItems",
    JSON.stringify(updatedItems)
  );
};

const completeWorkout = () => {
  const nextDay = day === 3 ? 1 : day + 1;

  setCheckedItems([]);
  localStorage.removeItem("checkedItems");

  setDay(nextDay);
  localStorage.setItem("day", String(nextDay));
};

  return (
    <main>
      <h1>今日のメニュー（Day{day}）</h1>

      <br />
      <br />

      <h2>
        {day === 1 && "胸＋上腕三頭筋"}
        {day === 2 && "脚"}
        {day === 3 && "背中＋上腕二頭筋"}
      </h2>

    {day === 1 && (
  <>
    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("bench")}
        onChange={() => toggleItem("bench")}
      />
      ベンチプレス {benchWeight}kg × 5回 × 5set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("incline")}
        onChange={() => toggleItem("incline")}
      />
      インクラインダンベルプレス 22kg × 8回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("dips")}
        onChange={() => toggleItem("dips")}
      />
      ディップス 10回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("lying")}
        onChange={() => toggleItem("lying")}
      />
      ライイングエクステンション 25kg × 10回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("narrow")}
        onChange={() => toggleItem("narrow")}
      />
      ナローベンチプレス 50kg × 8回 × 3set
    </label>
  </>
)}

{day === 2 && (
  <>
    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("squat")}
        onChange={() => toggleItem("squat")}
      />
      スクワット {squatWeight}kg × 5回 × 5set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("extension")}
        onChange={() => toggleItem("extension")}
      />
      レッグエクステンション 40kg × 12回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("curl")}
        onChange={() => toggleItem("curl")}
      />
      レッグカール 40kg × 12回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("bulgarian")}
        onChange={() => toggleItem("bulgarian")}
      />
      ブルガリアンスクワット 10回 × 3set
    </label>
  </>
)}

      {day === 3 && (
  <>
  <label>
  <input
    type="checkbox"
    checked={checkedItems.includes("pullup")}
    onChange={() => toggleItem("pullup")}
  />
  懸垂
  <input
    type="number"
    value={pullupReps}
    onChange={(e) => {
      const value = Number(e.target.value);
      setPullupReps(value);
      localStorage.setItem("pullupReps", String(value));
    }}
    style={{ width: "50px", marginLeft: "8px" }}
  />
  回 × 4set
</label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("latpull")}
        onChange={() => toggleItem("latpull")}
      />
      ラットプル 80kg × 6回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("row")}
        onChange={() => toggleItem("row")}
      />
      シーテッドロー 50kg × 10回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("deadlift")}
        onChange={() => toggleItem("deadlift")}
      />
      デッドリフト {deadliftWeight}kg × 5回 × 5set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("ezcurl")}
        onChange={() => toggleItem("ezcurl")}
      />
      EZバーカール 40kg × 10回 × 3set
    </label>
    <br />

    <label>
      <input
        type="checkbox"
        checked={checkedItems.includes("hammer")}
        onChange={() => toggleItem("hammer")}
      />
      ハンマーカール 16kg × 10回 × 3set
    </label>
  </>
)}

      <br />
      <br />

      <button onClick={completeWorkout}>完了</button>
    </main>
  );
}