"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TodayPage() {
  const router = useRouter();

  const [benchTrainingMax, setBenchTrainingMax] = useState(0);
  const [squatTrainingMax, setSquatTrainingMax] = useState(0);
  const [deadliftTrainingMax, setDeadliftTrainingMax] = useState(0);
  const [day, setDay] = useState(1);

  const [goal, setGoal] = useState("strength");
  const [frequency, setFrequency] = useState("3");
  const [days, setDays] = useState<string[]>([]);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [pullupReps, setPullupReps] = useState(10);
  const [backType, setBackType] = useState("A");
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const savedBenchTrainingMax =
      localStorage.getItem("benchTrainingMax");

    const savedSquatTrainingMax =
      localStorage.getItem("squatTrainingMax");

    const savedDeadliftTrainingMax =
      localStorage.getItem("deadliftTrainingMax");
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


    if (savedBenchTrainingMax)
      setBenchTrainingMax(Number(savedBenchTrainingMax));

    if (savedSquatTrainingMax)
      setSquatTrainingMax(Number(savedSquatTrainingMax));

    if (savedDeadliftTrainingMax)
      setDeadliftTrainingMax(Number(savedDeadliftTrainingMax));
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
    Math.round((benchTrainingMax * multiplier) / 2.5) * 2.5;

  const squatWeight =
    Math.round((squatTrainingMax * multiplier) / 2.5) * 2.5;

  const deadliftWeight =
    Math.round((deadliftTrainingMax * multiplier) / 2.5) * 2.5;

  const inclineWeight =
    Math.round((benchWeight * 0.7) / 2.5) * 2.5;

  const narrowWeight =
    Math.round((benchWeight * 0.7) / 2.5) * 2.5;

  const lyingWeight =
    Math.round((narrowWeight * 0.6) / 2.5) * 2.5;

  const latPullWeight =
    Math.round((benchTrainingMax * 0.8) / 2.5) * 2.5;

  const rowWeight =
    Math.round((latPullWeight * 0.7) / 2.5) * 2.5;

  const ezWeight =
    Math.round((benchTrainingMax * 0.4) / 2.5) * 2.5;

  const hammerWeight =
    Math.round((ezWeight * 0.4) / 2.5) * 2.5;

  const extensionWeight =
    Math.round((squatTrainingMax * 0.4) / 2.5) * 2.5;

  const legCurlWeight =
    Math.round((squatTrainingMax * 0.35) / 2.5) * 2.5;

  const bulgarianWeight =
    Math.round((squatTrainingMax * 0.2) / 2.5) * 2.5;

  const pullupTargetReps = Math.max(
    3,
    goal === "strength"
      ? Math.round(pullupReps * 0.7)
      : goal === "maintain"
        ? Math.round(pullupReps * 0.6)
        : Math.round(pullupReps * 0.5)
  );

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
    setShowFeedback(true);
  };

  const saveHistory = () => {
    const history = JSON.parse(
      localStorage.getItem("history") || "[]"
    );

    let title = "";

    if (frequency === "2") {
      title =
        day === 1
          ? "胸＋背中"
          : "脚";
    } else {
      title =
        day === 1
          ? "胸＋上腕三頭筋"
          : day === 2
            ? "脚"
            : backType === "A"
              ? "背中（広がり）＋上腕二頭筋"
              : "背中（厚み）";
    }

    history.push({
      date: new Date().toISOString().split("T")[0],
      day,
      title,
      goal,
      backType,

      bench:
        day === 1
          ? benchWeight
          : null,

      squat:
        day === 2
          ? squatWeight
          : null,

      deadlift:
        day === 3 && backType === "B"
          ? deadliftWeight
          : null,

      pullup:
        day === 3 && backType === "A"
          ? pullupTargetReps
          : null,
    });



    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  };

  const updateWeight = (action: string) => {

    saveHistory();

    let newBench = benchTrainingMax;
    let newSquat = squatTrainingMax;
    let newDeadlift = deadliftTrainingMax;
    let newPullup = pullupReps;

    if (action === "up") {

      if (day === 1) {
        newBench += 2.5;
      }

      if (day === 2) {
        newSquat += 2.5;
      }

      if (day === 3 && backType === "A") {
        newPullup += 1;
      }

      if (day === 3 && backType === "B") {
        newDeadlift += 5;
      }
    }

    if (action === "down") {

      if (day === 1) {
        newBench -= 2.5;
      }

      if (day === 2) {
        newSquat -= 2.5;
      }

      if (day === 3 && backType === "A") {
        newPullup = Math.max(1, newPullup - 1);
      }

      if (day === 3 && backType === "B") {
        newDeadlift -= 5;
      }
    }

    localStorage.setItem("benchTrainingMax", String(newBench));
    localStorage.setItem("squatTrainingMax", String(newSquat));
    localStorage.setItem("deadliftTrainingMax", String(newDeadlift));
    localStorage.setItem("pullupReps", String(newPullup));

    let nextDay;

    if (frequency === "2") {
      nextDay = day === 1 ? 2 : 1;
    } else {
      nextDay = day === 3 ? 1 : day + 1;
    }

    if (frequency === "3" && day === 3) {
      const nextBackType = backType === "A" ? "B" : "A";
      localStorage.setItem("backType", nextBackType);
    }

    localStorage.removeItem("checkedItems");
    localStorage.setItem("day", String(nextDay));

    window.location.reload();
  };



  return (
    <main>
      <h1>今日のメニュー（Day{day}）</h1>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={() => {
            const prevDay =
              frequency === "2"
                ? day === 1 ? 2 : 1
                : day === 1 ? 3 : day - 1;

            localStorage.setItem("day", String(prevDay));
            window.location.reload();
          }}
        >
          ← 前の日
        </button>

        <button
          onClick={() => {
            const nextDay =
              frequency === "2"
                ? day === 1 ? 2 : 1
                : day === 3 ? 1 : day + 1;

            localStorage.setItem("day", String(nextDay));
            window.location.reload();
          }}
          style={{ marginLeft: "8px" }}
        >
          次の日 →
        </button>
      </div>

      <p>次回：Day{nextDay}</p>
      <p>推奨日：{nextRecommendedDay}</p>
      <p>推定時間：{estimatedTime}分</p>

      <p>
        目標：
        {goal === "strength" && "重量更新"}
        {goal === "maintain" && "維持"}
        {goal === "diet" && "減量"}
      </p>

      <button
        onClick={() => router.push("/setup")}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          marginBottom: "16px",
        }}
      >
        設定変更
      </button>

      <button
        onClick={() => router.push("/history")}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          marginLeft: "8px",
        }}
      >
        履歴
      </button>

      <button
        onClick={() => router.push("/report")}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          marginLeft: "8px",
        }}
      >
        成長レポート
      </button>

      <br />
      <br />
      <hr />
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
            detail={`${inclineWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
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
            detail={`${lyingWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="narrow"
            name="ナローベンチプレス"
            detail={`${narrowWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
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
            detail={`${pullupTargetReps}回 x 3set`}
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
            detail={`${extensionWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />

          <br />
          <br />

          <Exercise
            id="curl"
            name="レッグカール"
            detail={`${legCurlWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />

          <br />

          <Exercise
            id="bulgarian"
            name="ブルガリアンスクワット"
            detail={`${bulgarianWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      {day === 3 && backType === "A" && (
        <>
          <Exercise
            id="pullup"
            name="懸垂"
            detail={`${pullupTargetReps}回 x 4set`}
          />
          <br />

          <Exercise
            id="latpull"
            name="ラットプル"
            detail={`${latPullWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="ezcurl"
            name="EZバーカール"
            detail={`${ezWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
          <br />

          <Exercise
            id="hammer"
            name="ハンマーカール"
            detail={`${hammerWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
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
            detail={`${rowWeight}kg x ${accessoryReps}回 x ${accessorySets}set`}
          />
        </>
      )}

      <br />
      <br />

      <button
        onClick={completeWorkout}
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        完了
      </button>

      {
        showFeedback && (
          <>
            <br />
            <hr />
            <h2>次回重量</h2>

            <button
              onClick={() => updateWeight("up")}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              ⬆ 上げる
              <br />
              今回は余裕だった
            </button>

            <button
              onClick={() => updateWeight("keep")}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "18px",
                marginBottom: "12px",
              }}
            >
              ➡ そのまま継続
              <br />
              ちょうど良かった
            </button>

            <button
              onClick={() => updateWeight("down")}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "18px",
              }}
            >
              ⬇ 下げる
              <br />
              重すぎた
            </button>
          </>
        )
      }

    </main>
  );
}