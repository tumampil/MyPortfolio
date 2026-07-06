"use client";

import { Briefcase, GraduationCap, Zap, Layers, Globe } from "lucide-react";
import { experience, education } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden" style={{ background: "#030603" }}>
      {/* Circuit background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
              <path d="M 20 120 L 80 120 L 80 60 L 160 60 L 160 120 L 220 120" stroke="#00ff41" strokeWidth="1" fill="none" />
              <path d="M 120 20 L 120 60" stroke="#00ff41" strokeWidth="1" fill="none" />
              <path d="M 120 160 L 120 220" stroke="#00ff41" strokeWidth="1" fill="none" />
              <path d="M 40 40 L 40 80 L 80 80" stroke="#00ff41" strokeWidth="0.5" fill="none" />
              <path d="M 160 160 L 200 160 L 200 200" stroke="#00ff41" strokeWidth="0.5" fill="none" />
              <circle cx="80" cy="120" r="3" fill="#00ff41" />
              <circle cx="160" cy="60" r="3" fill="#00ff41" />
              <circle cx="120" cy="60" r="2" fill="none" stroke="#00ff41" strokeWidth="1" />
              <circle cx="120" cy="160" r="2" fill="none" stroke="#00ff41" strokeWidth="1" />
              <circle cx="40" cy="80" r="2" fill="#00ff41" opacity="0.5" />
              <circle cx="200" cy="160" r="2" fill="#00ff41" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.5)" }}
          >
            // 03 — background
          </div>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff" }}
          >
            Experience &amp;<br />Education
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-16">
          {/* Left: Work Experience Timeline */}
          <div className="md:col-span-3">
            {/* Work section */}
            <div className="flex items-center gap-3 mb-8">
              <Briefcase size={14} style={{ color: "#00ff41" }} />
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#00ff41" }}
              >
                Work Experience
              </span>
            </div>

            <div>
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 pb-10"
                  style={{
                    borderLeft: idx < experience.length - 1 ? "1px solid rgba(0,255,65,0.15)" : "1px solid transparent",
                  }}
                >
                  <div
                    className="absolute -left-[7px] top-0 w-3.5 h-3.5"
                    style={{ border: "1px solid #00ff41", background: "#030603", boxShadow: "0 0 8px rgba(0,255,65,0.4)" }}
                  />

                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="text-xs tracking-wider"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.4)" }}
                    >
                      {exp.period}
                    </div>
                    <span
                      className="text-xs px-1.5 py-0.5"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        background: "rgba(0,255,65,0.1)",
                        color: "#00ff41",
                        border: "1px solid rgba(0,255,65,0.2)",
                      }}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  <h3
                    className="text-base font-bold mb-0.5"
                    style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff" }}
                  >
                    {exp.role}
                  </h3>
                  <div
                    className="text-sm mb-3 font-medium"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#00ff41", textShadow: "0 0 12px rgba(0,255,65,0.3)" }}
                  >
                    {exp.company}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ fontFamily: "Inter, sans-serif", color: "#3a5a3a" }}
                  >
                    {exp.description}
                  </p>

                  {exp.items.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {exp.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs"
                          style={{ fontFamily: "Inter, sans-serif", color: "#2a4a2a" }}
                        >
                          <span style={{ color: "#00ff41", flexShrink: 0 }}>▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5"
                        style={{
                          fontFamily: "JetBrains Mono, monospace",
                          background: "rgba(0,255,65,0.07)",
                          color: "#00ff41",
                          border: "1px solid rgba(0,255,65,0.15)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education section */}
            <div className="flex items-center gap-3 mt-4 mb-8">
              <GraduationCap size={14} style={{ color: "#00ff41" }} />
              <span
                className="text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#00ff41" }}
              >
                Education
              </span>
            </div>

            <div>
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 pb-8"
                  style={{
                    borderLeft: idx < education.length - 1 ? "1px solid rgba(0,255,65,0.15)" : "1px solid transparent",
                  }}
                >
                  <div
                    className="absolute -left-[7px] top-0 w-3.5 h-3.5"
                    style={{ border: "1px solid rgba(0,255,65,0.5)", background: "#030603" }}
                  />
                  <div
                    className="text-xs tracking-wider mb-1"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.4)" }}
                  >
                    {edu.period}
                  </div>
                  <div
                    className="text-sm font-bold mb-0.5"
                    style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff", fontSize: "13px" }}
                  >
                    {edu.degree}
                  </div>
                  <div
                    className="text-sm"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
                  >
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What I bring + full skills */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div
              className="text-xs tracking-[0.25em] uppercase mb-1"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "#2a4a2a" }}
            >
              Core strengths
            </div>

            {[
              { icon: Zap, title: "Fast Learner", desc: "Picked up Asterisk PBX, WebRTC, and SIP from scratch during OJT — shipped production features within weeks." },
              { icon: Layers, title: "Full-Stack Depth", desc: "Comfortable moving across the stack — from React UIs to FastAPI backends to Docker infrastructure." },
              { icon: Globe, title: "Team Collaboration", desc: "Worked effectively in a fast-paced startup environment. Communicates clearly, delivers on time." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-4 transition-all duration-200"
                style={{ border: "1px solid rgba(0,255,65,0.12)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,65,0.4)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,255,65,0.03)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,255,65,0.12)";
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-7 h-7 flex items-center justify-center"
                    style={{ border: "1px solid rgba(0,255,65,0.25)" }}
                  >
                    <Icon size={12} style={{ color: "#00ff41" }} />
                  </div>
                  <h4
                    className="text-xs font-bold"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#ffffff" }}
                  >
                    {title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#3a5a3a" }}>
                  {desc}
                </p>
              </div>
            ))}

            {/* Soft skills */}
            <div
              className="p-4 mt-1"
              style={{ border: "1px solid rgba(0,255,65,0.1)", background: "rgba(0,255,65,0.03)" }}
            >
              <div
                className="text-xs tracking-wider uppercase mb-3"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.4)" }}
              >
                Soft Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {["Problem Solving", "Critical Thinking", "Fast Learner", "Team Collaboration"].map(s => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      border: "1px solid rgba(0,255,65,0.15)",
                      color: "rgba(0,255,65,0.6)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
