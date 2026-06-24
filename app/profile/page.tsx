"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [gender, setGender] = useState("male");

  useEffect(() => {
    const savedGender =
      localStorage.getItem("gender");

    if (savedGender) {
      setGender(savedGender);
    }
  }, []);

  function saveAndNext() {
    localStorage.setItem("gender", gender);
    router.push("/setup");
  }

  return (
    <main>
      <h1>プロフィール入力</h1>

      <p>性別</p>

      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={(e) =>
            setGender(e.target.value)
          }
        />
        男性
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={(e) =>
            setGender(e.target.value)
          }
        />
        女性
      </label>

      <br />
      <br />

      <button onClick={saveAndNext}>
        次へ
      </button>
    </main>
  );
}