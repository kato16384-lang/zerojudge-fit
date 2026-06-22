"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodayPage() {
  const router = useRouter();

  const [benchMax, setBenchMax] = useState(0);
  const [squatMax, setSquatMax] = useState(0);
  const [deadliftMax, setDeadliftMax] = useState(0);
  const [day, setDay] = useState(1);

  const [goal, setGoal] = useState("strength");
  const [frequency, setFrequency] = useState("3");
  const [days, setDays] = useState<string[]>([]);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [pullupReps, setPullupReps] = useState(10);
  const [backType, setBackType] = useState("A");
  useEffect(() => {
    const savedBenchMax = localStorage.getItem("benchMax");
    const savedSquatMax = localStorage.getItem("squatMax");
    const savedDeadliftMax = localStorage.getItem("deadliftMax");
    const savedDay = localStorage.getItem("day");
    const savedGoal = localStorage.getItem("goal");
    const savedFrequency = localStorage.getItem("frequency");
    const savedDays = localStorage.getItem("days");
    const savedCheckedItems = localStorage.getItem("checkedItems");
    const savedPullupReps = localStorage.getItem("pullupReps");
    const savedBackType = localStorage.getItem("backType");


    if (savedBenchMax) setBenchMax(Number(savedBenchMax));
    if (savedSquatMax) setSquatMax(Number(savedSquatMax));
    if (savedDeadliftMax) setDeadliftMax(Number(savedDeadliftMax));
    if (savedDay) setDay(Number(savedDay));
    if (savedGoal) setGoal(savedGoal);
    if (savedFrequency) setFrequency(savedFrequency);
    if (savedDays) {
      setDays(JSON.parse(savedDays));
    }
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
    if (savedPullupReps) {
      setPullupReps(Number(savedPullupReps));
    }
    if (savedBackType) {
      setBackType(savedBackType);
    }
  }, []);

  const multiplier =
    goal === "strength"
      ? 0.85
      : goal === "maintain"
        ? 0.75
        : 0.65;
  const reps =
    goal === "strength"
      ? 5
      : goal === "maintain"
        ? 8
        : 12;

  const sets =
    goal === "strength"
      ? 5
      : 3;
  const accessoryReps =
    goal === "strength"
      ? 8
      : goal === "maintain"
        ? 10
        : 12;

  const accessorySets = 3;

  const benchWeight =
    Math.round((benchMax * multiplier) / 2.5) * 2.5;

  const squatWeight =
    Math.round((squatMax * multiplier) / 2.5) * 2.5;

  const deadliftWeight =
    Math.round((deadliftMax * multiplier) / 2.5) * 2.5;

  const nextDay =
    frequency === "2"
      ? day === 1
        ? 2
        : 1
      : day === 3
        ? 1
        : day + 1;

  const estimatedTime =
    frequency === "2"
      ? day === 1
        ? 25
        : 35
      : day === 1
        ? 45
        : day === 2
          ? 35
          : backType === "A"
            ? 30
            : 20;

  const toggleItem = (item: string) => {
    let updatedItems: string[];

    if (checkedItems.includes(item)) {
      updatedItems = checkedItems.filter((i) => i !== item);
    } else {
      updatedItems = [...checkedItems, item];
    }

    setCheckedItems(updatedItems);
    localStorage.setItem("checkedItems", JSON.stringify(updatedItems));
  };

  const completeWorkout = () => {
    let nextDay;

    if (frequency === "3" && day === 3) {
      const nextBackType = backType === "A" ? "B" : "A";

      setBackType(nextBackType);
      localStorage.setItem("backType", nextBackType);
    }

    if (frequency === "2") {
      nextDay = day === 1 ? 2 : 1;
    } else {
      nextDay = day === 3 ? 1 : day + 1;
    }

    setCheckedItems([]);
    localStorage.removeItem("checkedItems");

    setDay(nextDay);
    localStorage.setItem("day", String(nextDay));
  };

  return (
    <main>
      <h1>今日のメニュー（Day{day}）</h1>

      <p>次回：Day{nextDay}</p>

      <p>推定時間：{estimatedTime}分</p>

      <p>
        目標：
        {goal === "strength" && "重量更新"}
        {goal === "maintain" && "維持"}
        {goal === "diet" && "減量"}
      </p>

      <button onClick={() => router.push("/setup")}>設定変更</button>

      <br />
      <br />

      <h2>
        {day === 1 && frequency === "3" && "胸＋上腕三頭筋"}
        {day === 1 && frequency === "2" && "胸＋背中"}
        {day === 2 && "脚"}

        {day === 3 && backType === "A" &&
          "背中（広がり）＋上腕二頭筋"}

        {day === 3 && backType === "B" &&
          "背中（厚み）"}
      </h2>

      {day === 1 && frequency === "3" && (
        <>
          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("bench")}
              onChange={() => toggleItem("bench")}
            />
            ベンチプレス {benchWeight}kg × {reps}回 × {sets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("incline")}
              onChange={() => toggleItem("incline")}
            />
            インクラインダンベルプレス 22kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("dips")}
              onChange={() => toggleItem("dips")}
            />
            ディップス  {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("lying")}
              onChange={() => toggleItem("lying")}
            />
            ライイングエクステンション 25kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("narrow")}
              onChange={() => toggleItem("narrow")}
            />
            ナローベンチプレス 50kg × {accessoryReps}回 × {accessorySets}set
          </label>
        </>
      )}
      {day === 1 && frequency === "2" && (
        <>

          <input
            type="checkbox"
            checked={checkedItems.includes("bench")}
            onChange={() => toggleItem("bench")}
          />
          <>
            ベンチプレス
            <br />
            {benchWeight}kg × {reps}回 × {sets}set
          </>




          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("pullup")}
              onChange={() => toggleItem("pullup")}
            />
            懸垂
            <br />
            {pullupReps}回 × 4set
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("dips")}
              onChange={() => toggleItem("dips")}
            />

            ディップス
            <br />

            {accessoryReps}回 × {accessorySets}set
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
            スクワット {squatWeight}kg × {reps}回 × {sets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("extension")}
              onChange={() => toggleItem("extension")}
            />
            レッグエクステンション 40kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("curl")}
              onChange={() => toggleItem("curl")}
            />
            レッグカール 40kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("bulgarian")}
              onChange={() => toggleItem("bulgarian")}
            />
            ブルガリアンスクワット  {accessoryReps}回 × {accessorySets}set
          </label>
        </>
      )}

      {day === 3 && backType === "A" && (
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
            ラットプル 80kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("ezcurl")}
              onChange={() => toggleItem("ezcurl")}
            />
            EZバーカール 40kg × {accessoryReps}回 × {accessorySets}set
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("hammer")}
              onChange={() => toggleItem("hammer")}
            />
            ハンマーカール 16kg × {accessoryReps}回 × {accessorySets}set
          </label>
        </>
      )}

      {day === 3 && backType === "B" && (
        <>
          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("deadlift")}
              onChange={() => toggleItem("deadlift")}
            />
            デッドリフト {deadliftWeight}kg × {reps}回 × {sets}set
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={checkedItems.includes("row")}
              onChange={() => toggleItem("row")}
            />
            シーテッドロー 50kg × {accessoryReps}回 × {accessorySets}set
          </label>
        </>
      )}

      <br />
      <br />

      <button onClick={completeWorkout}>完了</button>
    </main>
  );
}