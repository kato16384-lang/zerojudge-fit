import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>ZeroJudge Fit</h1>

      <p>判断ゼロで筋トレするアプリ</p>

      <p>開いたら、今日やることだけ表示します。</p>

      <Link href="/profile">
        <button>はじめる</button>
      </Link>
    </main>
  );
}