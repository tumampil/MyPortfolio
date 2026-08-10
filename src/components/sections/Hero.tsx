"use client";

import { ArrowRight, ChevronDown, Wifi } from "lucide-react";
import { MatrixCanvas } from "@/components/MatrixCanvas";
import { TypingText } from "@/components/TypingText";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { LaptopViewer } from "@/components/LaptopViewer";
import { skillGroups } from "@/lib/data";

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export function Hero({ setActiveSection }: HeroProps) {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-between overflow-x-hidden" style={{ background: "#060a06" }}>
      <MatrixCanvas />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 40%, rgba(6,10,6,0.85) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent 60%, #060a06 100%)" }}
      />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "10%", width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Scanline sweep animation */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(0,255,65,0.4), transparent)",
          animation: "scanline-move 8s linear infinite",
          zIndex: 1,
        }}
      />
      <style>{`
        @keyframes scanline-move {
          0%{transform:translateY(-100%)}
          100%{transform:translateY(100vh)}
        }
      `}</style>

      <div className="relative z-10 max-w-[1750px] mx-auto px-6 lg:px-12 pt-24 pb-10 w-full flex-1 flex flex-col justify-between">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.1fr_1fr] gap-8 lg:gap-10 items-center">

          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#00ff41", boxShadow: "0 0 8px #00ff41, 0 0 20px rgba(0,255,65,0.5)" }}
              />
              <span
                className="text-xs tracking-[0.35em] uppercase"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#00ff41" }}
              >
                Open to Opportunities
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-2"
              style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff" }}
            >
              Jasper S.
            </h1>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-5"
              style={{ fontFamily: "Orbitron, sans-serif", color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.45)" }}
            >
              Tumampil
            </h1>

            <p
              className="text-sm mb-1 tracking-wider"
              style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.6)" }}
            >
              {">"}{" "}
              <span style={{ color: "#00ff41" }}>
                <TypingText
                  texts={[
                    "Full-Stack Developer",
                    "Computer Engineering Graduate",
                    "VoIP & WebRTC Engineer",
                    "React / Next.js Developer",
                    "FastAPI & Python Backend Dev",
                    "Flutter & Mobile Dev",
                  ]}
                />
              </span>
            </p>

            <p
              className="text-sm leading-relaxed mt-5 mb-8 max-w-md"
              style={{ color: "#4a6a4a", fontFamily: "Inter, sans-serif" }}
            >
              Computer Engineering graduate with hands-on OJT experience building full-stack web apps,
              VoIP systems, and real-time dashboards. Proficient in React/Next.js, Python/FastAPI,
              Flutter/Supabase, Asterisk PBX, and Docker.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-200 group"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "#00ff41",
                  color: "#060a06",
                  boxShadow: "0 0 20px rgba(0,255,65,0.3)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(255,255,255,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#00ff41";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,255,65,0.3)";
                }}
                onClick={() => setActiveSection("projects")}
              >
                View Projects
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="text-xs tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-200"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  border: "1px solid rgba(0,255,65,0.4)",
                  color: "rgba(0,255,65,0.7)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#00ff41";
                  (e.currentTarget as HTMLButtonElement).style.color = "#00ff41";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,255,65,0.07)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,255,65,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(0,255,65,0.7)";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
                onClick={() => setActiveSection("contact")}
              >
                Contact Me
              </button>
            </div>

            {/* Quick stats */}
            <div
              className="flex gap-8 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(0,255,65,0.1)" }}
            >
              {[
                { value: "3", label: "Live Projects" },
                { value: "5mo", label: "OJT @ Kaizo" },
                { value: "TUP", label: "Manila Grad" },
              ].map(({ value, label }, i) => (
                <div key={label}>
                  <div
                    className="text-2xl font-black"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: i === 2 ? "#00ff41" : "#ffffff",
                      textShadow: i === 2 ? "0 0 20px rgba(0,255,65,0.5)" : "none",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs mt-1 tracking-wider"
                    style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: 3D Laptop */}
          <div className="hidden lg:block relative" style={{ height: 480 }}>
            <LaptopViewer />
            {/* Drag hint */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 pointer-events-none"
              style={{
                border: "1px solid rgba(0,255,65,0.15)",
                background: "rgba(5,9,8,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Wifi size={11} style={{ color: "#00ff41" }} />
              <span
                className="text-xs tracking-widest"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.5)" }}
              >
                DRAG TO ROTATE
              </span>
            </div>
          </div>

          {/* Right: Photo + terminal */}
          <div className="hidden md:flex flex-col gap-4">
            {/* Profile photo */}
            <div className="flex gap-4 items-start">
              {/* Photo with neon frame */}
              <div className="relative shrink-0">
                {/* Outer glow */}
                <div
                  className="absolute -inset-1"
                  style={{
                    background: "linear-gradient(135deg, #00ff41 0%, transparent 50%, #00ff41 100%)",
                    filter: "blur(6px)",
                    opacity: 0.5,
                  }}
                />
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 180,
                    height: 220,
                    border: "1px solid rgba(0,255,65,0.6)",
                  }}
                >
                  <ImageWithFallback
                    src="/images/profile.jpg"
                    alt="Jasper S. Tumampil — graduation photo"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Scanline overlay on photo */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                    }}
                  />
                  {/* Bottom label */}
                  <div
                    className="absolute bottom-0 left-0 right-0 px-3 py-2"
                    style={{ background: "rgba(6,10,6,0.85)", borderTop: "1px solid rgba(0,255,65,0.3)" }}
                  >
                    <div
                      className="text-xs font-bold tracking-wider"
                      style={{ fontFamily: "Orbitron, sans-serif", color: "#00ff41" }}
                    >
                      JASPER S.T.
                    </div>
                    <div
                      className="text-xs"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
                    >
                      CpE Graduate
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal mini card */}
              <div
                className="flex-1 text-sm leading-7"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  border: "1px solid rgba(0,255,65,0.2)",
                  background: "rgba(6,10,6,0.8)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 py-2"
                  style={{ borderBottom: "1px solid rgba(0,255,65,0.1)" }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span className="text-xs ml-1" style={{ color: "#2a4a2a" }}>profile.ts</span>
                </div>
                <div className="p-4 text-xs leading-6">
                  <div><span style={{ color: "#00ff41" }}>const</span> <span style={{ color: "#7dd3fc" }}>jasper</span> <span style={{ color: "#fff" }}>= {"{"}</span></div>
                  <div className="pl-4"><span style={{ color: "rgba(0,255,65,0.55)" }}>name</span><span style={{ color: "#fff" }}>:</span> <span style={{ color: "#fde68a" }}>&quot;Jasper Tumampil&quot;</span><span style={{ color: "#fff" }}>,</span></div>
                  <div className="pl-4"><span style={{ color: "rgba(0,255,65,0.55)" }}>degree</span><span style={{ color: "#fff" }}>:</span> <span style={{ color: "#fde68a" }}>&quot;B.Tech CpE&quot;</span><span style={{ color: "#fff" }}>,</span></div>
                  <div className="pl-4"><span style={{ color: "rgba(0,255,65,0.55)" }}>school</span><span style={{ color: "#fff" }}>:</span> <span style={{ color: "#fde68a" }}>&quot;TUP Manila&quot;</span><span style={{ color: "#fff" }}>,</span></div>
                  <div className="pl-4"><span style={{ color: "rgba(0,255,65,0.55)" }}>stack</span><span style={{ color: "#fff" }}>: [</span></div>
                  <div className="pl-8"><span style={{ color: "#fde68a" }}>&quot;Next.js&quot;</span><span style={{ color: "#fff" }}>, </span><span style={{ color: "#fde68a" }}>&quot;FastAPI&quot;</span><span style={{ color: "#fff" }}>,</span></div>
                  <div className="pl-8"><span style={{ color: "#fde68a" }}>&quot;PostgreSQL&quot;</span><span style={{ color: "#fff" }}>, </span><span style={{ color: "#fde68a" }}>&quot;Docker&quot;</span><span style={{ color: "#fff" }}>,</span></div>
                  <div className="pl-8"><span style={{ color: "#fde68a" }}>&quot;Flutter&quot;</span><span style={{ color: "#fff" }}>, </span><span style={{ color: "#fde68a" }}>&quot;Supabase&quot;</span></div>
                  <div className="pl-4"><span style={{ color: "#fff" }}>],</span></div>
                  <div className="pl-4"><span style={{ color: "rgba(0,255,65,0.55)" }}>available</span><span style={{ color: "#fff" }}>:</span> <span style={{ color: "#00ff41" }}>true</span></div>
                  <div><span style={{ color: "#fff" }}>{"}"}</span></div>
                </div>
              </div>
            </div>

            {/* Skill chips */}
            <div className="grid grid-cols-2 gap-2">
              {skillGroups.map(({ icon: Icon, label, items }) => (
                <div
                  key={label}
                  className="p-3 transition-all duration-200"
                  style={{ border: "1px solid rgba(0,255,65,0.1)", background: "rgba(6,10,6,0.5)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,255,65,0.35)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(0,255,65,0.1)")}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon size={11} style={{ color: "#00ff41" }} />
                    <span className="text-xs tracking-wider" style={{ fontFamily: "JetBrains Mono, monospace", color: "#00ff41" }}>
                      {label}
                    </span>
                  </div>
                  <div className="text-xs leading-5" style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}>
                    {items.slice(0, 5).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setActiveSection("projects")}
            className="flex flex-col items-center gap-2 transition-colors"
            style={{ color: "#2a4a2a" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00ff41")}
            onMouseLeave={e => (e.currentTarget.style.color = "#2a4a2a")}
          >
            <span className="text-xs tracking-[0.3em]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              SCROLL
            </span>
            <ChevronDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
