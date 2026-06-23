"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
    const router = useRouter();

    const [history, setHistory] = useState<any[]>([]);
    const [days, setDays] = useState<string[]>([]);

    useEffect(() => {
        const savedHistory = JSON.parse(
            localStorage.getItem("history") || "[]"
        );

        const savedDays = JSON.parse(
            localStorage.getItem("days") || "[]"
        );

        setHistory(savedHistory.reverse());
        setDays(savedDays);
    }, []);

    const currentMonthCount = history.filter(
        (item) => {
            const today = new Date();

            const currentMonth =
                today.toISOString().slice(0, 7);

            return item.date.startsWith(currentMonth);
        }
    ).length;
    const today = new Date();

    const firstDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );



    const daysPassed =
        Math.floor(
            (today.getTime() - firstDay.getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;

    const dayMap: { [key: string]: number } = {
        日: 0,
        月: 1,
        火: 2,
        水: 3,
        木: 4,
        金: 5,
        土: 6,
    };

    let expectedCount = 0;

    for (let i = 0; i < daysPassed; i++) {
        const date = new Date(
            today.getFullYear(),
            today.getMonth(),
            1 + i
        );

        const weekDay = date.getDay();

        if (
            days.some(
                (d: string) => dayMap[d] === weekDay
            )
        ) {
            expectedCount++;
        }
    }
    const executionRate =
        expectedCount === 0
            ? 100
            : Math.min(
                100,
                Math.round(
                    (currentMonthCount / expectedCount) * 100
                )
            );
    const benchHistory = history.filter(
        (item) => item.bench
    );

    const squatHistory = history.filter(
        (item) => item.squat
    );

    const deadliftHistory = history.filter(
        (item) => item.deadlift
    );

    const pullupHistory = history.filter(
        (item) => item.pullup
    );

    const bestBench = Math.max(
        ...benchHistory.map(
            (item) => item.bench
        ),
        0
    );

    const bestSquat = Math.max(
        ...squatHistory.map(
            (item) => item.squat
        ),
        0
    );

    const bestDeadlift = Math.max(
        ...deadliftHistory.map(
            (item) => item.deadlift
        ),
        0
    );

    const bestPullup = Math.max(
        ...pullupHistory.map(
            (item) => item.pullup
        ),
        0
    );

    return (
        <main style={{ padding: "20px" }}>
            <h1>実行履歴</h1>

            <p>
                今月実行：
                {currentMonthCount}/{expectedCount}回
            </p>

            <p>
                累計実行：{history.length}回
            </p>

            <p>
                実行率：{executionRate}%
            </p>

            <p>
                ベンチ最高：{bestBench}kg
            </p>

            <p>
                スクワット最高：{bestSquat}kg
            </p>

            <p>
                デッド最高：{bestDeadlift}kg
            </p>

            <p>
                懸垂最高：{bestPullup}回
            </p>

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