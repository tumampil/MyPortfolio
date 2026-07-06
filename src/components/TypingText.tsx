"use client";

import { useState, useEffect } from "react";

export function TypingText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, 75);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setCharIdx(c => c - 1); setDisplayed(current.slice(0, charIdx - 1)); }, 35);
    } else {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse" style={{ color: "#00ff41" }}>▋</span>
    </span>
  );
}
