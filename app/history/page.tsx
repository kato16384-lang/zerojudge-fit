"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
    const router = useRouter();

    const [history, setHistory] = useState<any[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [previousBench, setPreviousBench] = useState(0);
    const [previousSquat, setPreviousSquat] = useState(0);
    const [previousDeadlift, setPreviousDeadlift] = useState(0);
    const [previousPullup, setPreviousPullup] = useState(0);

    useEffect(() => {
        const savedHistory = JSON.parse(
            localStorage.getItem("history") || "[]"
        );

        const savedDays = JSON.parse(
            localStorage.getItem("days") || "[]"
        );

        setHistory(savedHistory.reverse());
        setDays(savedDays);
        const previousDate = new Date();
        previousDate.setMonth(previousDate.getMonth() - 1);

        const previousMonth =
            previousDate.toISOString().slice(0, 7);

        setPreviousBench(
            Number(
                localStorage.getItem(
                    `monthlyBenchMax_${previousMonth}`
                )
            ) || 0
        );

        setPreviousSquat(
            Number(
                localStorage.getItem(
                    `monthlySquatMax_${previousMonth}`
                )
            ) || 0
        );

        setPreviousDeadlift(
            Number(
                localStorage.getItem(
                    `monthlyDeadliftMax_${previousMonth}`
                )
            ) || 0
        );

        setPreviousPullup(
            Number(
                localStorage.getItem(
                    `monthlyPullup_${previousMonth}`
                )
            ) || 0
        );
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

    const rank =
        executionRate >= 90
            ? "S"
            : executionRate >= 80
                ? "A"
                : executionRate >= 70
                    ? "B"
                    : executionRate >= 60
                        ? "C"
                        : "D";

    const comment =
        rank === "S"
            ? "やるやんけ。まあ来月も続くかって話やけどな。"
            : rank === "A"
                ? "順調やんけ。けどSランクとれてないのはカスカスのカス。"
                : rank === "B"
                    ? "まあどんだけ土台が良くても所詮【B】しかとれない有象無象の一人よなあ。。。。"
                    : rank === "C"
                        ? "厳しいって、もう30手前やって、ぶくぶく醜いストレージ漁り三十路は救えんって、本気出せって"
                        : "";






    function deleteHistory(index: number) {
        if (!confirm("この履歴を削除しますか？")) {
            return;
        }

        const updatedHistory = history.filter(
            (_, i) => i !== index
        );

        setHistory(updatedHistory);

        localStorage.setItem(
            "history",
            JSON.stringify(updatedHistory)
        );
    }

    return (
        <main style={{ padding: "20px" }}>

            <h1>実行履歴</h1>

            <h2>月間レポート</h2>
            <p>{comment}</p>

            <h3>先月比</h3>




            <p>
                ベンチ：
                {bestBench - previousBench > 0 ? "+" : ""}
                {bestBench - previousBench}kg
            </p>

            <p>
                スクワット：
                {bestSquat - previousSquat > 0 ? "+" : ""}
                {bestSquat - previousSquat}kg
            </p>

            <p>
                デッド：
                {bestDeadlift - previousDeadlift > 0 ? "+" : ""}
                {bestDeadlift - previousDeadlift}kg
            </p>

            <p>
                懸垂：
                {bestPullup - previousPullup > 0 ? "+" : ""}
                {bestPullup - previousPullup}回
            </p>



            <p>評価：{rank}</p>

            <p>
                今月実施：
                {currentMonthCount}/{expectedCount}回
            </p>

            <p>
                実行率：
                {executionRate}%
            </p>

            <p>
                ベンチ最高：
                {bestBench}kg
            </p>

            <p>
                スクワット最高：
                {bestSquat}kg
            </p>

            <p>
                デッド最高：
                {bestDeadlift}kg
            </p>

            <p>
                懸垂最高：
                {bestPullup}回
            </p>

            <p>
                累計実行：{history.length}回
            </p>

            <hr />

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
                    {item.exercises?.map(
                        (exercise: string, i: number) => (
                            <p key={i}>{exercise}</p>
                        )
                    )}




                    <button
                        onClick={() => deleteHistory(index)}
                    >
                        削除
                    </button>
                </div>
            ))}
        </main>
    );
}