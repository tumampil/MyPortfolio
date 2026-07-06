import {
  Code2,
  Cpu,
  Database,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "01",
    name: "Prometheon",
    tag: "Enterprise VoIP & SMS",
    year: "2026",
    description:
      "Full-stack enterprise communications platform with Asterisk PBX integration, WebRTC softphone UI, SMS blasting system, and real-time dashboard.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Celery", "JsSIP", "Docker"],
    highlights: [
      "Configured Asterisk PBX & AMI for call routing, barging, monitoring, and outbound TTS dialing",
      "Developed WebRTC softphone UI using JsSIP",
      "Built SMS blasting system and real-time dashboard",
      "Containerized services with Docker",
    ],
  },
  {
    id: "02",
    name: "Maleia-JCT",
    tag: "Loan Client Profiling",
    year: "2026",
    description:
      "Online loan application system with automated PDF profiling reports. Streamlines client data capture and generates formatted reports for financial processing.",
    tech: ["Next.js", "Python", "FastAPI", "PostgreSQL", "PDF Generation"],
    highlights: [
      "Developed online loan application forms",
      "Automated PDF profiling report generation",
      "Full-stack implementation with Next.js frontend",
    ],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experience = [
  {
    period: "Feb 2026 – Jun 2026",
    role: "Full-Stack Developer Intern",
    company: "Kaizo Technologies",
    badge: "OJT",
    description:
      "Built and shipped production features for two major platforms — Prometheon (Enterprise SMS & VoIP) and Maleia-JCT (Loan Client Profiling). Worked across the full stack from frontend UI to backend APIs to infrastructure.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Celery", "Docker", "Asterisk PBX"],
    items: [
      "Built full-stack features using Next.js, FastAPI, PostgreSQL, and Celery",
      "Configured Asterisk PBX and AMI for call routing, barging, and TTS dialing",
      "Developed WebRTC softphone UI (JsSIP) and SMS blasting system",
      "Utilized Docker for local development and containerized services",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Freelance Photo Editor",
    company: "Self-Employed",
    badge: "Freelance",
    description:
      "Delivered professional photo editing services including image recoloring, background removal, resizing, and line art creation for clients.",
    tags: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    items: [
      "Image recoloring and background removal",
      "Resizing images and creating line art",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const education = [
  {
    degree: "Bachelor of Technology in Computer Engineering Technology",
    school: "Technological University of the Philippines Manila",
    period: "2021 – 2026",
  },
  {
    degree: "Senior High School – STEM",
    school: "Datamex College of Saint Adeline",
    period: "2018 – 2019",
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export interface SkillGroup {
  icon: LucideIcon;
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { icon: Code2, label: "Frontend", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "shadcn/ui"] },
  { icon: Database, label: "Backend", items: ["Python", "FastAPI", "SQLAlchemy", "Celery", "REST APIs", "PHP"] },
  { icon: Globe, label: "Databases & DevOps", items: ["PostgreSQL", "Redis", "Docker", "Linux", "Nginx", "GitHub"] },
  { icon: Cpu, label: "Hardware & Other", items: ["Arduino", "ESP32", "Raspberry Pi", "RFID", "WebRTC", "Asterisk PBX"] },
];
