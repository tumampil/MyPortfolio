import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="py-8"
      style={{ background: "#020402", borderTop: "1px solid rgba(0,255,65,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal size={13} style={{ color: "#00ff41" }} />
          <span
            className="text-xs tracking-[0.2em]"
            style={{ fontFamily: "Orbitron, sans-serif", color: "rgba(0,255,65,0.5)" }}
          >
            JST.DEV
          </span>
        </div>
        <div
          className="text-xs"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "#2a4a2a" }}
        >
          © 2026 Jasper S. Tumampil — Computer Engineering Graduate, TUP Manila
        </div>
        <div
          className="text-xs"
          style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.2)" }}
        >
          v1.0.0
        </div>
      </div>
    </footer>
  );
}
