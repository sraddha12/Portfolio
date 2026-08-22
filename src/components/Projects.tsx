"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShieldAlert, Compass, BookOpen, Layers } from "lucide-react";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Inline Custom Github Icon (since lucide brand icons are removed in version 1+)
const Github = ({ size = 24, ...props }: CustomIconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectDetails {
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string;
  results: string;
}

interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  details?: ProjectDetails;
  githubUrl: string;
  demoUrl: string;
  icon: React.ReactNode;
}

const featuredProjects: FeaturedProject[] = [
  {
    id: "cybersecurity-anomaly",
    title: "Adaptive Online Machine Learning for Real-Time Cybersecurity Anomaly Detection",
    subtitle: "Hero Project - Real-time Network Anomaly Engine",
    category: "AI & Cybersecurity",
    tags: ["Python", "River", "Kafka", "FastAPI", "Next.js", "Docker"],
    description: "An adaptive stream-learning system designed to detect zero-day cybersecurity attacks on high-velocity network packet streams without requiring heavy offline training pipelines.",
    githubUrl: "https://github.com/sraddha12/cyber-anomaly-detection",
    demoUrl: "https://cyber-anomaly-demo.vercel.app",
    icon: <ShieldAlert className="text-rose-400" size={32} />,
    details: {
      problem: "Traditional intrusion detection systems rely on static offline models that suffer from concept drift and fail to identify zero-day attacks when network signature distributions change.",
      solution: "Implemented an online machine learning classifier that updates its parameters incrementally with each packet stream, adapting automatically to new traffic baselines.",
      architecture: "Packet Stream -> Apache Kafka Queue -> River (Online ML Engine in Python) -> FastAPI API Server -> Real-time Next.js Dashboard.",
      features: [
        "Real-time concept drift tracking via ADWIN (Adaptive Windowing).",
        "Sub-millisecond latency per packet inference.",
        "Dynamic threshold adaptation to reduce false positive rates."
      ],
      challenges: "Preventing catastrophic forgetting in the online model when dealing with massive blocks of benign traffic followed by sudden sparse attacks.",
      results: "Currently working on this active research project. Active baseline models achieve 98.4% classification accuracy on the NSL-KDD dataset with absolute independence from offline batch retraining cycles."
    }
  },
  {
    id: "butterfly-effect",
    title: "Butterfly Effect Simulator",
    subtitle: "Interactive Chaos Modeling Engine",
    category: "Interactive Simulation",
    tags: ["Three.js", "React Three Fiber", "Tailwind CSS", "Canvas"],
    description: "A gorgeous, interactive simulation engine modeling chaotic attractor systems (Lorenz, Rössler) to visualize how miniscule changes propagate through complex mathematical equations.",
    githubUrl: "https://github.com/sraddha12/Butterfly-Effect-Simulator",
    demoUrl: "https://butterfly-simulator.vercel.app",
    icon: <Compass className="text-sky-400" size={28} />,
  },
  {
    id: "flashcards-generator",
    title: "Flashcards Generator",
    subtitle: "AI-Powered Study Companion",
    category: "AI & EdTech",
    tags: ["React", "Next.js", "OpenAI API", "Tailwind CSS", "Framer Motion"],
    description: "An AI-powered smart study companion that automatically extracts core definitions and concepts from user notes or documents to generate interactive spaced-repetition flashcards.",
    githubUrl: "https://github.com/sraddha12/FlashCards",
    demoUrl: "https://flashcards-demo.vercel.app",
    icon: <BookOpen className="text-violet-400" size={28} />,
  }
];

const otherProjects = [
  {
    title: "Community Resource Sharing Platform",
    description: "A centralized peer-to-peer resource logistics hub enabling community members to coordinate donations, share equipment, and manage emergency request dispatches.",
    tags: ["Next.js", "Firebase", "Google Maps API", "Tailwind"],
    githubUrl: "https://github.com/sraddha12/Resource-Sharing",
  },
  {
    title: "AI Career Coach",
    description: "An interactive, AI-driven guidance platform that analyzes resumes, conducts simulated mock interviews, and suggests personalized learning roadmaps.",
    tags: ["Next.js", "OpenAI API", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/sraddha12/Career-Coach",
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [activeTab, setActiveTab] = useState<"overview" | "problem" | "architecture" | "results">("overview");

  // Tilt helper
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 3;
    const rotateY = (x / (rect.width / 2)) * 3;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.005, 1.005, 1.005)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section
      id="projects"
      className="py-24 flex items-center justify-center relative px-6 z-10"
    >
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            My Creative Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Projects
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        </div>

        {/* 1. HERO PROJECT (Cybersecurity Anomaly Detection) */}
        {featuredProjects.slice(0, 1).map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <div
              className="glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden group border border-accent/10 shadow-[0_20px_50px_rgba(79,157,255,0.08)]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Soft blue corner light */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none -z-10 group-hover:bg-accent/10 transition-colors" />

              {/* Title & Icons */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 md:p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    {project.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white font-display mt-1 leading-snug flex flex-wrap items-center gap-3">
                      {project.title}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 border border-accent/25 text-accent shadow-[0_0_10px_rgba(79,157,255,0.15)] animate-pulse">
                        Currently Working
                      </span>
                    </h3>
                  </div>
                </div>
                
                {/* CTA Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-colors"
                    data-cursor="pointer"
                    data-magnetic
                    aria-label="GitHub Repository"
                  >
                    <Github size={18} />
                  </a>

                </div>
              </div>

              {/* Detailed Multi-tab Interface */}
              <div className="flex flex-col gap-6 mt-2">
                {/* Tab selectors */}
                <div className="flex flex-wrap gap-2 border-b border-white/5 pb-3">
                  {(["overview", "problem", "architecture", "results"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold focus:outline-none transition-all ${
                        activeTab === tab
                          ? "bg-accent/15 border border-accent/25 text-white shadow-[0_0_10px_rgba(79,157,255,0.1)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                      data-cursor="pointer"
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Contents */}
                <div className="min-h-[140px] text-sm md:text-base text-gray-300 leading-relaxed">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === "overview" && (
                        <div className="flex flex-col gap-4">
                          <p>{project.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Layers size={14} className="text-accent" />
                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Features:</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                            {project.details?.features.map((f, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeTab === "problem" && (
                        <div className="flex flex-col gap-4">
                          <div>
                            <span className="text-xs uppercase tracking-widest text-rose-400 font-bold block mb-1">The Problem:</span>
                            <p>{project.details?.problem}</p>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">The Solution:</span>
                            <p>{project.details?.solution}</p>
                          </div>
                        </div>
                      )}

                      {activeTab === "architecture" && (
                        <div>
                          <span className="text-xs uppercase tracking-widest text-accent font-bold block mb-1">System Pipeline:</span>
                          <p>{project.details?.architecture}</p>
                          <div className="mt-4 p-4 rounded-xl bg-background border border-white/5 text-xs text-gray-400 font-mono">
                            [Network Traffic] --&gt; (Kafka Broker) --&gt; (River classifier) --&gt; [Concept Drift Check] --&gt; (Next.js client)
                          </div>
                        </div>
                      )}

                      {activeTab === "results" && (
                        <div className="flex flex-col gap-4">
                          <div>
                            <span className="text-xs uppercase tracking-widest text-accent font-bold block mb-1">Challenges Overcome:</span>
                            <p>{project.details?.challenges}</p>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">Final Metrics:</span>
                            <p className="text-white font-semibold">{project.details?.results}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-xs text-gray-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* 2 & 3. SECONDARY FEATURED PROJECTS SIDE-BY-SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.slice(1).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.15, ease: "easeOut" }}
            >
              <div
                className="glass-card rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group h-full hover:border-accent/15 transition-all"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
                data-cursor="pointer"
              >
                {/* Background glow overlay */}
                <div className="absolute top-0 right-0 w-[160px] h-[160px] rounded-full bg-accent/5 blur-[45px] pointer-events-none -z-10 group-hover:bg-accent/10 transition-colors" />

                {/* Header Title & Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-accent/5 border border-accent/15">
                      {project.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                        {project.category}
                      </span>
                      <h3 className="text-lg font-bold text-white font-display mt-0.5">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Footer details: Tags & Links */}
                <div className="flex flex-col gap-4 mt-auto border-t border-white/5 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-[10px] text-gray-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      data-cursor="pointer"
                    >
                      <Github size={12} />
                      Code
                    </a>

                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. OTHER PROJECTS SECTION */}
        <div className="flex flex-col gap-6 mt-6">
          <h3 className="text-lg font-bold font-display text-white tracking-wide flex items-center gap-2">
            <Layers size={16} className="text-accent" />
            Other Notable Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project, idx) => (
              <motion.div
                key={idx}
                className="glass-card rounded-xl p-6 flex flex-col justify-between gap-4 border border-white/5 hover:border-white/10 transition-colors"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-3">
                    <h4 className="text-sm md:text-base font-semibold text-white">
                      {project.title}
                    </h4>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                      data-cursor="pointer"
                      aria-label="GitHub Repository"
                    >
                      <Github size={15} />
                    </a>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-gray-500 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
