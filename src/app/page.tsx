"use client";

import { useState, useEffect, useRef } from "react";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const SECTIONS = ["about", "projects", "experience", "contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const isCooldownRef = useRef(false);

  useEffect(() => {
    const mainEl = document.getElementById("main-content");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: "instant" });
    }
    setScrolled(false);
  }, [activeSection]);

  useEffect(() => {
    const mainEl = document.getElementById("main-content");
    if (!mainEl) return;

    const handleWheel = (e: WheelEvent) => {
      if (isCooldownRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = mainEl;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 30;
      const isAtTop = scrollTop <= 30;

      const currentIndex = SECTIONS.indexOf(activeSection);

      if (e.deltaY > 40 && isAtBottom && currentIndex < SECTIONS.length - 1) {
        isCooldownRef.current = true;
        setActiveSection(SECTIONS[currentIndex + 1]);
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 700);
      } else if (e.deltaY < -40 && isAtTop && currentIndex > 0) {
        isCooldownRef.current = true;
        setActiveSection(SECTIONS[currentIndex - 1]);
        setTimeout(() => {
          isCooldownRef.current = false;
        }, 700);
      }
    };

    mainEl.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      mainEl.removeEventListener("wheel", handleWheel);
    };
  }, [activeSection]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#060a06] relative">
      <Nav activeSection={activeSection} setActiveSection={setActiveSection} scrolled={scrolled} />
      <main
        id="main-content"
        className="flex-1 overflow-y-auto flex flex-col min-h-0"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 60)}
      >
        {activeSection === "about" && (
          <div className="flex-1 flex flex-col min-h-0 animate-fade-in">
            <Hero setActiveSection={setActiveSection} />
          </div>
        )}
        {activeSection === "projects" && (
          <div className="shrink-0 animate-fade-in">
            <Projects />
            <Footer />
          </div>
        )}
        {activeSection === "experience" && (
          <div className="shrink-0 animate-fade-in">
            <Experience />
            <Footer />
          </div>
        )}
        {activeSection === "contact" && (
          <div className="shrink-0 animate-fade-in">
            <Contact />
            <Footer />
          </div>
        )}
      </main>
    </div>
  );
}



