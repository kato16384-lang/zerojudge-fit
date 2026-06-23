"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
    const router = useRouter();

    const [benchBaseMax, setBenchBaseMax] = useState(0);
    const [squatBaseMax, setSquatBaseMax] = useState(0);
    const [deadliftBaseMax, setDeadliftBaseMax] = useState(0);
    const [pullupReps, setPullupReps] = useState(0);
    const [benchTrainingMax, setBenchTrainingMax] = useState(0);
    const [squatTrainingMax, setSquatTrainingMax] = useState(0);
    const [deadliftTrainingMax, setDeadliftTrainingMax] = useState(0);

    useEffect(() => {
        const bench =
            localStorage.getItem("benchBaseMax");

        const squat =
            localStorage.getItem("squatBaseMax");

        const deadlift =
            localStorage.getItem("deadliftBaseMax");

        const pullup =
            localStorage.getItem("pullupReps");
        const benchTraining =
            localStorage.getItem("benchTrainingMax");

        const squatTraining =
            localStorage.getItem("squatTrainingMax");

        const deadliftTraining =
            localStorage.getItem("deadliftTrainingMax");

        if (bench) setBenchBaseMax(Number(bench));
        if (squat) setSquatBaseMax(Number(squat));
        if (deadlift) setDeadliftBaseMax(Number(deadlift));
        if (pullup) setPullupReps(Number(pullup));
        if (benchTraining) setBenchTrainingMax(Number(benchTraining));
        if (squatTraining) setSquatTrainingMax(Number(squatTraining));
        if (deadliftTraining) setDeadliftTrainingMax(Number(deadliftTraining));
    }, []);
    const benchGrowth =
        benchTrainingMax - benchBaseMax;

    const squatGrowth =
        squatTrainingMax - squatBaseMax;

    const deadliftGrowth =
        deadliftTrainingMax - deadliftBaseMax;

    return (
        <main style={{ padding: "20px" }}>
            <h1>成長レポート</h1>

            <p>
                ベンチプレス
                <br />
                基準：{benchBaseMax}kg
                <br />
                現在：{benchTrainingMax}kg
                <br />
                成長：
                {benchGrowth > 0 ? "+" : ""}
                {benchGrowth}kg
            </p>

            <p>
                スクワット
                <br />
                基準：{squatBaseMax}kg
                <br />
                現在：{squatTrainingMax}kg
                <br />
                成長：
                {squatGrowth > 0 ? "+" : ""}
                {squatGrowth}kg
            </p>
            
            <p>
                デッドリフト
                <br />
                基準：{deadliftBaseMax}kg
                <br />
                現在：{deadliftTrainingMax}kg
                <br />
                成長：
                {deadliftGrowth > 0 ? "+" : ""}
                {deadliftGrowth}kg
            </p>
            <p>懸垂：{pullupReps}回</p>

            <br />

            <button
                onClick={() => router.push("/today")}
            >
                ← 戻る
            </button>
        </main>
    );
}