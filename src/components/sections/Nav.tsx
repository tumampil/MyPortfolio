"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";

interface NavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrolled: boolean;
}

export function Nav({ activeSection, setActiveSection, scrolled }: NavProps) {
  const [open, setOpen] = useState(false);

  const links = ["About", "Projects", "Experience", "Contact"];

  const handleLinkClick = (link: string) => {
    setActiveSection(link.toLowerCase());
    setOpen(false);
  };

  const isSolid = activeSection !== "about" || scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isSolid ? "rgba(6,10,6,1)" : "transparent",
        borderBottom: isSolid ? "1px solid rgba(0,255,65,0.18)" : "1px solid transparent",
        backdropFilter: isSolid ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleLinkClick("About")}
        >
          <Terminal size={18} style={{ color: "#00ff41" }} />
          <span
            className="text-sm font-bold tracking-[0.25em] uppercase"
            style={{ fontFamily: "Orbitron, sans-serif", color: "#00ff41" }}
          >
            JST<span style={{ color: "#ffffff" }}>.</span>DEV
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="relative group text-xs tracking-[0.2em] uppercase transition-colors duration-200 outline-none select-none"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: isActive ? "#00ff41" : "#5a7a5a",
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.color = "#00ff41";
                }}
                onMouseLeave={e => {
                  if (!isActive) e.currentTarget.style.color = "#5a7a5a";
                }}
              >
                {link}
                <span
                  className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                  style={{
                    background: "#00ff41",
                    width: isActive ? "100%" : "0",
                  }}
                />
              </button>
            );
          })}
          <button
            onClick={() => handleLinkClick("Contact")}
            className="text-xs tracking-[0.2em] uppercase px-5 py-2 transition-all duration-200 outline-none select-none"
            style={{ fontFamily: "JetBrains Mono, monospace", border: "1px solid #00ff41", color: "#00ff41" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#00ff41";
              (e.currentTarget as HTMLButtonElement).style.color = "#060a06";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#00ff41";
            }}
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden outline-none" style={{ color: "#00ff41" }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-5"
          style={{ background: "rgba(6,10,6,0.97)", borderTop: "1px solid rgba(0,255,65,0.15)" }}
        >
          {links.map(link => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="text-left text-xs tracking-[0.2em] uppercase transition-colors outline-none select-none"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: isActive ? "#00ff41" : "#5a7a5a",
                }}
              >
                {link}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

