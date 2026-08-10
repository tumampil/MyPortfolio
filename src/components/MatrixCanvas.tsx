"use client";

import { useRef, useEffect } from "react";

export function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01</>{}[]()=+-*&^%#@!";
    const fontSize = 14;
    const cols = Math.floor(canvas.width / (fontSize * 3)); // sparser — every 3rd column
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -80);

    let frame: number;
    let tick = 0;
    const draw = () => {
      tick++;
      // Only update every 3rd frame for slower speed
      if (tick % 3 === 0) {
        ctx.fillStyle = "rgba(6, 10, 6, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize * 3;
          const y = drops[i] * fontSize;
          const rand = Math.random();
          if (rand > 0.97) ctx.fillStyle = "rgba(0,255,65,0.25)";
          else if (rand > 0.8) ctx.fillStyle = "rgba(0,204,51,0.15)";
          else ctx.fillStyle = "rgba(0,85,17,0.12)";
          ctx.fillText(char, x, y);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) drops[i] = 0;
          drops[i]++;
        }
      }
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", opacity: 0.35 }}
    />
  );
}
