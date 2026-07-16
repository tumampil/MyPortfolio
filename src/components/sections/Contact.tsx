"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Github } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "#060a06" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.15) 3px, rgba(0,255,65,0.15) 4px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle at bottom left, rgba(0,255,65,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div
            className="text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(0,255,65,0.5)" }}
          >
            // 04 — reach out
          </div>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "Orbitron, sans-serif", color: "#ffffff" }}
          >
            {"Let's Build"}<br />
            <span style={{ color: "#00ff41", textShadow: "0 0 30px rgba(0,255,65,0.4)" }}>Something</span>{" Real"}
          </h2>
          <p
            className="text-sm mt-4"
            style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
          >
            {">"} Open to full-time roles, and interesting collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="space-y-3 mb-8">
              {[
                { icon: Mail, label: "Email", value: "jaspertumampil@gmail.com", href: "mailto:jaspertumampil@gmail.com" },
                { icon: Phone, label: "Phone", value: "(+63) 9930078345", href: "tel:+639930078345" },
                { icon: MapPin, label: "Address", value: "65H A4 Taniman, Batasan Hills, Quezon City 1126", href: "#" },
                { icon: Github, label: "GitHub", value: "github.com/jaspertumampil", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 group transition-all duration-200"
                  style={{ border: "1px solid rgba(0,255,65,0.1)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,65,0.35)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,255,65,0.04)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,65,0.1)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{ border: "1px solid rgba(0,255,65,0.2)" }}
                  >
                    <Icon size={14} style={{ color: "#00ff41" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs tracking-wider uppercase"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "#2a4a2a" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm mt-0.5"
                      style={{ fontFamily: "JetBrains Mono, monospace", color: "#5a7a5a" }}
                    >
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="flex items-center gap-3 p-4"
              style={{ border: "1px solid rgba(0,255,65,0.15)" }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: "#00ff41", boxShadow: "0 0 6px #00ff41, 0 0 14px rgba(0,255,65,0.4)" }}
              />
              <span
                className="text-xs"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
              >
                Currently <span style={{ color: "#00ff41" }}>available</span> — response within 24h
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: "name", label: "Name / Company Name", type: "text", placeholder: "Your name or company name" },
              { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(field => (
              <div key={field.id}>
                <label
                  className="block text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                  required
                  className="w-full text-sm px-4 py-3 transition-all duration-200 outline-none"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    background: "transparent",
                    border: "1px solid rgba(0,255,65,0.15)",
                    color: "#e0ffe0",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#00ff41")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,255,65,0.15)")}
                />
              </div>
            ))}

            <div>
              <label
                className="block text-xs tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "JetBrains Mono, monospace", color: "#3a5a3a" }}
              >
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about the project or opportunity..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                className="w-full text-sm px-4 py-3 resize-none transition-all duration-200 outline-none"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  background: "transparent",
                  border: "1px solid rgba(0,255,65,0.15)",
                  color: "#e0ffe0",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#00ff41")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(0,255,65,0.15)")}
              />
            </div>

            {errorMsg && (
              <div
                className="text-xs p-3 text-red-500 border border-red-500/20 bg-red-500/5 animate-fade-in"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {"> ERROR: "} {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm font-bold tracking-[0.2em] uppercase py-4 flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none outline-none"
              style={{
                fontFamily: "JetBrains Mono, monospace",
                background: sent ? "rgba(0,255,65,0.1)" : loading ? "rgba(0,255,65,0.2)" : "#00ff41",
                color: sent || loading ? "#00ff41" : "#060a06",
                border: sent || loading ? "1px solid #00ff41" : "1px solid transparent",
                boxShadow: sent || loading ? "none" : "0 0 20px rgba(0,255,65,0.2)",
              }}
            >
              {loading ? "Sending..." : sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
