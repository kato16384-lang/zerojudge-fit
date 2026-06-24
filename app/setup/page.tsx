"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [benchWeight, setBenchWeight] = useState("");
  const [benchReps, setBenchReps] = useState("");
  const [squatWeight, setSquatWeight] = useState("");
  const [squatReps, setSquatReps] = useState("");
  const [deadliftWeight, setDeadliftWeight] = useState("");
  const [deadliftReps, setDeadliftReps] = useState("");
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

    const savedBenchWeight =
      localStorage.getItem("benchWeight");

    const savedBenchReps =
      localStorage.getItem("benchReps");
    const savedSquatWeight =
      localStorage.getItem("squatWeight");

    const savedSquatReps =
      localStorage.getItem("squatReps");

    const savedDeadliftWeight =
      localStorage.getItem("deadliftWeight");

    const savedDeadliftReps =
      localStorage.getItem("deadliftReps");
    const savedGoal = localStorage.getItem("goal");
    const savedDays = localStorage.getItem("days");
    const savedPullupReps = localStorage.getItem("pullupReps");



    if (savedBenchWeight)
      setBenchWeight(savedBenchWeight);

    if (savedBenchReps)
      setBenchReps(savedBenchReps);
    if (savedSquatWeight)
      setSquatWeight(savedSquatWeight);

    if (savedSquatReps)
      setSquatReps(savedSquatReps);

    if (savedDeadliftWeight)
      setDeadliftWeight(savedDeadliftWeight);

    if (savedDeadliftReps)
      setDeadliftReps(savedDeadliftReps);
    if (savedGoal) setGoal(savedGoal);

    if (savedDays) {
      setDays(JSON.parse(savedDays));
    }
    if (savedPullupReps) {
      setPullupReps(savedPullupReps);
    }
  }, []);


  function saveAndGoNext() {
    const gender =
      localStorage.getItem("gender") || "male";

    const limits =
      gender === "male"
        ? {
          bench: 50,
          squat: 50,
          deadlift: 50,
          pullup: 5,
        }
        : {
          bench: 20,
          squat: 20,
          deadlift: 20,
          pullup: 0,
        };
    if (Number(benchWeight) < limits.bench) {
      alert(
        "弱いって、ただでさえ弱いのにこれ以上弱くなっていくの厳しいって、50≦に設定しろって"
      );
      return;
    }

    if (Number(squatWeight) < limits.squat) {
      alert(
        "弱いって、ただでさえ弱いのにこれ以上弱くなっていくの厳しいって、50≦に設定しろって"
      );
      return;
    }

    if (Number(deadliftWeight) < limits.deadlift) {
      alert(
        "弱いって、ただでさえ弱いのにこれ以上弱くなっていくの厳しいって、50≦に設定しろって"
      );
      return;
    }

    if (Number(pullupReps) < limits.pullup) {
      alert(
        "弱いって、ただでさえ弱いのにこれ以上弱くなっていくの厳しいって"
      );
      return;
    }
    if (days.length !== 2 && days.length !== 3) {
      alert("曜日は2日または3日選択してください");
      return;
    }
    const estimatedBenchMax =
      Math.round(
        Number(benchWeight) *
        (1 + Number(benchReps) / 30)
      );

    const estimatedSquatMax =
      Math.round(
        Number(squatWeight) *
        (1 + Number(squatReps) / 30)
      );

    const estimatedDeadliftMax =
      Math.round(
        Number(deadliftWeight) *
        (1 + Number(deadliftReps) / 30)
      );
    const currentMonth = new Date()
      .toISOString()
      .slice(0, 7);


    localStorage.setItem(
      "benchBaseMax",
      String(estimatedBenchMax)
    );

    localStorage.setItem(
      "benchTrainingMax",
      String(estimatedBenchMax)
    );

    localStorage.setItem(
      "benchWeight",
      benchWeight
    );

    localStorage.setItem(
      "benchReps",
      benchReps
    );
    localStorage.setItem(
      "squatBaseMax",
      String(estimatedSquatMax)
    );

    localStorage.setItem(
      "squatTrainingMax",
      String(estimatedSquatMax)
    );

    localStorage.setItem(
      "squatWeight",
      squatWeight
    );

    localStorage.setItem(
      "squatReps",
      squatReps
    );

    localStorage.setItem(
      "deadliftBaseMax",
      String(estimatedDeadliftMax)
    );

    localStorage.setItem(
      "deadliftTrainingMax",
      String(estimatedDeadliftMax)
    );

    localStorage.setItem(
      "deadliftWeight",
      deadliftWeight
    );

    localStorage.setItem(
      "deadliftReps",
      deadliftReps
    );

    localStorage.setItem("pullupReps", pullupReps);

    localStorage.setItem("goal", goal);

    localStorage.setItem("days", JSON.stringify(days));

    localStorage.setItem(
      `monthlyBenchMax_${currentMonth}`,
      String(estimatedBenchMax)
    );

    localStorage.setItem(
      `monthlySquatMax_${currentMonth}`,
      String(estimatedSquatMax)
    );

    localStorage.setItem(
      `monthlyDeadliftMax_${currentMonth}`,
      String(estimatedDeadliftMax)
    );

    localStorage.setItem(
      `monthlyPullup_${currentMonth}`,
      pullupReps
    );

    localStorage.setItem(
      "lastSetupMonth",
      currentMonth
    );

    router.push("/today");
  }

  return (
    <main>
      <h1>今の実績</h1>

      <h2>ベンチプレス</h2>

      <div>
        重量
        <input
          type="number"
          value={benchWeight}
          onChange={(e) =>
            setBenchWeight(e.target.value)
          }
          style={{ width: "80px" }}
        />
        kg

        回数

        <input
          type="number"
          value={benchReps}
          onChange={(e) =>
            setBenchReps(e.target.value)
          }
          style={{ width: "80px" }}
        />
        rep
      </div>

      <p>
        推定MAX
        {
          Math.round(
            Number(benchWeight) *
            (1 + Number(benchReps) / 30)
          )
        }kg
      </p>

      <h2>スクワット</h2>


      <div>
        重量
        <input
          type="number"
          value={squatWeight}
          onChange={(e) =>
            setSquatWeight(e.target.value)
          }
          style={{ width: "80px" }}
        />
        kg

        回数

        <input
          type="number"
          value={squatReps}
          onChange={(e) =>
            setSquatReps(e.target.value)
          }
          style={{ width: "80px" }}
        />
        rep
      </div>

      <p>
        推定MAX
        {
          Math.round(
            Number(squatWeight) *
            (1 + Number(squatReps) / 30)
          )
        }kg
      </p>

      <h2>デッドリフト</h2>



      <div>
        重量
        <input
          type="number"
          value={deadliftWeight}
          onChange={(e) =>
            setDeadliftWeight(e.target.value)
          }
          style={{ width: "80px" }}
        />
        kg

        回数

        <input
          type="number"
          value={deadliftReps}
          onChange={(e) =>
            setDeadliftReps(e.target.value)
          }
          style={{ width: "80px" }}
        />
        rep
      </div>

      <p>
        推定MAX
        {
          Math.round(
            Number(deadliftWeight) *
            (1 + Number(deadliftReps) / 30)
          )
        }kg
      </p>

      <h2>懸垂</h2>
      <div>
        MAX回数
        <input
          type="number"
          value={pullupReps}
          onChange={(e) => setPullupReps(e.target.value)}
          style={{ width: "80px" }}
        />
        回
      </div>

      <h2>目標</h2>

      <label style={{ display: "block", marginBottom: "8px" }}>
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

      <label style={{ display: "block", marginBottom: "8px" }}>
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

      <label style={{ display: "block", marginBottom: "8px" }}>
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
      <button onClick={() => router.push("/profile")}>
        ← 戻る
      </button>

      <button onClick={saveAndGoNext}>メニュー作成</button>
    </main>
  );
}