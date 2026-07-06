"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

export function Projects() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-32 overflow-hidden" style={{ background: "#060a06" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,255,65,0.25) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          opacity: 0.12,
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, #00ff41 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div
              className="text-xs tracking-[0.35em] uppercase mb-3"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.5)" }}
            >
              // 02 — work
            </div>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff" }}
            >
              Built &amp;<br />Shipped
            </h2>
          </div>
          <div
            className="hidden md:block text-right text-xs leading-6"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#2a4a2a" }}
          >
            <div style={{ color: "#00ff41" }}>02 projects</div>
            <div>production</div>
            <div>OJT work</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map(project => (
            <div
              key={project.id}
              className="group cursor-pointer transition-all duration-300 p-6"
              style={{
                border: `1px solid ${active === project.id ? "rgba(0,255,65,0.5)" : "rgba(0,255,65,0.12)"}`,
                background: active === project.id ? "rgba(0,255,65,0.04)" : "rgba(6,10,6,0.6)",
              }}
              onMouseEnter={() => setActive(project.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className="text-xs"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.3)" }}
                    >
                      {project.id}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        border: "1px solid rgba(0,255,65,0.2)",
                        color: "#00ff41",
                      }}
                    >
                      {project.tag}
                    </span>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "#2a4a2a" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-black transition-colors duration-200"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: active === project.id ? "#00ff41" : "#ffffff",
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
                <ExternalLink
                  size={15}
                  className="shrink-0 mt-1 transition-colors duration-200"
                  style={{ color: active === project.id ? "#00ff41" : "#2a4a2a" }}
                />
              </div>

              <p
                className="text-sm leading-relaxed mb-5"
                style={{ fontFamily: "Inter, sans-serif", color: "#4a6a4a" }}
              >
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif", color: "#3a5a3a" }}
                  >
                    <span style={{ color: "#00ff41", flexShrink: 0 }}>▸</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 transition-all duration-200"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      border: `1px solid ${active === project.id ? "rgba(0,255,65,0.4)" : "rgba(0,255,65,0.1)"}`,
                      color: active === project.id ? "#00ff41" : "rgba(0,255,65,0.3)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
