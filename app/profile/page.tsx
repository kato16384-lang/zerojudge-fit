import Link from "next/link";

export default function ProfilePage() {
  return (
    <main>
      <h1>プロフィール入力</h1>

      <p>性別</p>
      <input />

      <p>年齢</p>
      <input />

      <p>身長</p>
      <input />

      <p>体重</p>
      <input />

      <br />
      <br />

      <Link href="/setup">
        <button>次へ</button>
      </Link>
    </main>
  );
}