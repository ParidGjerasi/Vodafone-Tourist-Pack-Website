"use client";
import { useState } from "react";

export default function Button() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="click-button"
    >
      Earned {count} GB!!!!!
    </button>
  );
}