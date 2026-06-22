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
    const savedDays = localStorage.getItem("days");
    if (savedDays) {
      const parsedDays = JSON.parse(savedDays);

      setDays(parsedDays);


      if (parsedDays.length === 2) {
        setFrequency("2");
      } else {
        setFrequency("3");
      }
    }
    const savedCheckedItems = localStorage.getItem("checkedItems");
    const savedPullupReps = localStorage.getItem("pullupReps");
    const savedBackType = localStorage.getItem("backType");


    if (savedBenchMax) setBenchMax(Number(savedBenchMax));
    if (savedSquatMax) setSquatMax(Number(savedSquatMax));
    if (savedDeadliftMax) setDeadliftMax(Number(savedDeadliftMax));
    if (savedDay) setDay(Number(savedDay));
    if (savedGoal) setGoal(savedGoal);
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
  let nextRecommendedDay = "";

  if (frequency === "2") {
    nextRecommendedDay =
      nextDay === 1
        ? days[0]
        : days[1];
  } else {
    nextRecommendedDay =
      nextDay === 1
        ? days[0]
        : nextDay === 2
          ? days[1]
          : days[2];
  }

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

  const Exercise = ({
    id,
    name,
    detail,
  }: {
    id: string;
    name: string;
    detail: string;
  }) => (
    <label style={{ display: "block", marginBottom: "16px" }}>
      <input
        type="checkbox"
        checked={checkedItems.includes(id)}
        onChange={() => toggleItem(id)}
      />

      <div style={{ marginLeft: "24px" }}>
        {name}
        <br />
        {detail}
      </div>
    </label>
  );

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
      <p>推奨日：{nextRecommendedDay}</p>

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
          <Exercise
            id="bench"
            name="ベンチプレス"
            detail={`${benchWeight}kg x ${reps}回 x ${sets}set`}
          />
          <br />

          <Exercise
            id="incline"
            name="インクラインダンベルプレス"
            detail={`22kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="dips"
            name="ディップス"
            detail={`${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="lying"
            name="ライイングエクステンション"
            detail={`25kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="narrow"
            name="ナローベンチプレス"
            detail={`50kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}
      {day === 1 && frequency === "2" && (
        <>
          <Exercise
            id="bench"
            name="ベンチプレス"
            detail={`${benchWeight}kg x ${reps}回 x ${sets}set`}
          />

          <br />

          <Exercise
            id="pullup"
            name="懸垂"
            detail={`${pullupReps}回 x 4set`}
          />

          <br />

          <Exercise
            id="dips"
            name="ディップス"
            detail={`${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      {day === 2 && (
        <>
          <Exercise
            id="squat"
            name="スクワット"
            detail={`${squatWeight}kg x ${reps}回 x ${sets}set`}
          />
          <br />

          <Exercise
            id="extension"
            name="レッグエクステンション"
            detail={`40kg x ${accessoryReps}回 x ${accessorySets}set`}
          />

          <br />
          <br />

          <Exercise
            id="curl"
            name="レッグカール"
            detail={`40kg x ${accessoryReps}回 x ${accessorySets}set`}
          />

          <br />

          <Exercise
            id="bulgarian"
            name="ブルガリアンスクワット"
            detail={`${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      {day === 3 && backType === "A" && (
        <>
          <Exercise
            id="pullup"
            name="懸垂"
            detail={`${pullupReps}回 x 4set`}
          />
          <br />

          <Exercise
            id="latpull"
            name="ラットプル"
            detail={`80kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="ezcurl"
            name="EZバーカール"
            detail={`40kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="hammer"
            name="ハンマーカール"
            detail={`16kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      {day === 3 && backType === "B" && (
        <>
          <Exercise
            id="deadlift"
            name="デッドリフト"
            detail={`${deadliftWeight}kg x ${reps}回 x ${sets}set`}
          />

          <br />

          <Exercise
            id="row"
            name="シーテッドロー"
            detail={`50kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      <br />
      <br />

      <button onClick={completeWorkout}>完了</button>
    </main>
  );
}