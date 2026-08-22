"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee, Code2, Cpu, Globe, Paintbrush, Layers, Atom, Server, Activity, Network,
  Database, Flame, Shield, Terminal, Eye, AlertTriangle, Lock, Radio, GitBranch,
  Monitor, Binary, Send, PenTool, Image as ImageIcon, Lightbulb,
  Users, Award, MessageSquare, Clock, Zap, Tv
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  name: string;
  id: string;
  skills: Skill[];
}

// Custom SVG GitHub Icon since Lucide brand icons are removed in v1+
const GithubIcon = ({ size = 40, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    id: "programming-languages",
    skills: [
      { name: "Java", icon: <Coffee size={40} className="text-[#4F9DFF]" /> },
      { name: "Python", icon: <Code2 size={40} className="text-[#4F9DFF]" /> },
      { name: "C", icon: <Cpu size={40} className="text-[#4F9DFF]" /> },
      { name: "JavaScript", icon: <Terminal size={40} className="text-[#4F9DFF]" /> },
    ],
  },
  {
    name: "Frontend",
    id: "frontend",
    skills: [
      { name: "HTML5", icon: <Globe size={40} className="text-[#4F9DFF]" /> },
      { name: "CSS3", icon: <Paintbrush size={40} className="text-[#4F9DFF]" /> },
      { name: "Tailwind CSS", icon: <Layers size={40} className="text-[#4F9DFF]" /> },
      { name: "React.js", icon: <Atom size={40} className="text-[#4F9DFF]" /> },
    ],
  },
  {
    name: "Backend",
    id: "backend",
    skills: [
      { name: "Node.js", icon: <Server size={40} className="text-[#4F9DFF]" /> },
      { name: "Express.js", icon: <Activity size={40} className="text-[#4F9DFF]" /> },
      { name: "REST APIs", icon: <Network size={40} className="text-[#4F9DFF]" /> },
      { name: "JSP & Servlets", icon: <Cpu size={40} className="text-[#4F9DFF]" /> },
    ],
  },
  {
    name: "Database",
    id: "database",
    skills: [
      { name: "MySQL", icon: <Database size={40} className="text-[#4F9DFF]" /> },
      { name: "MongoDB", icon: <Database size={40} className="text-[#4F9DFF]" /> },
      { name: "Firebase", icon: <Flame size={40} className="text-[#4F9DFF]" /> },
    ],
  },
  {
    name: "Cyber Security",
    id: "cyber-security",
    skills: [
      { name: "Network Security", icon: <Shield size={40} className="text-[#4F9DFF]" /> },
      { name: "Ethical Hacking", icon: <Terminal size={40} className="text-[#4F9DFF]" /> },
      { name: "Vulnerability Assessment", icon: <Eye size={40} className="text-[#4F9DFF]" /> },
      { name: "Threat Detection", icon: <AlertTriangle size={40} className="text-[#4F9DFF]" /> },
      { name: "OWASP Basics", icon: <Lock size={40} className="text-[#4F9DFF]" /> },
      { name: "Wireshark", icon: <Radio size={40} className="text-[#4F9DFF]" /> },
    ],
  },
  {
    name: "Tools",
    id: "tools",
    skills: [
      { name: "Git", icon: <GitBranch size={40} className="text-[#4F9DFF]" /> },
      { name: "GitHub", icon: <GithubIcon size={40} className="text-[#4F9DFF]" /> },
      { name: "VS Code", icon: <Monitor size={40} className="text-[#4F9DFF]" /> },
      { name: "IntelliJ IDEA", icon: <Binary size={40} className="text-[#4F9DFF]" /> },
      { name: "Postman", icon: <Send size={40} className="text-[#4F9DFF]" /> },
      { name: "Figma", icon: <PenTool size={40} className="text-[#4F9DFF]" /> },
      { name: "Canva", icon: <ImageIcon size={40} className="text-[#4F9DFF]" /> },
      { name: "XAMPP", icon: <Server size={40} className="text-[#4F9DFF]" /> },
    ],
  },

  {
    name: "Soft Skills",
    id: "soft-skills",
    skills: [
      { name: "Problem Solving", icon: <Lightbulb size={40} className="text-[#4F9DFF]" /> },
      { name: "Teamwork", icon: <Users size={40} className="text-[#4F9DFF]" /> },
      { name: "Leadership", icon: <Award size={40} className="text-[#4F9DFF]" /> },
      { name: "Communication", icon: <MessageSquare size={40} className="text-[#4F9DFF]" /> },
      { name: "Time Management", icon: <Clock size={40} className="text-[#4F9DFF]" /> },
      { name: "Quick Learning", icon: <Zap size={40} className="text-[#4F9DFF]" /> },
      { name: "Presentation Skills", icon: <Tv size={40} className="text-[#4F9DFF]" /> },
    ],
  },
];

const marqueeSkills = [
  "Java", "Python", "C", "JavaScript", "HTML", "CSS", "React", "Tailwind CSS",
  "Node.js", "Express.js", "MySQL", "MongoDB", "Firebase", "Git", "GitHub", 
  "VS Code", "IntelliJ IDEA", "Postman", "Figma", "Canva", "XAMPP", 
  "Ethical Hacking", "Network Security", "Wireshark"
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategory = skillCategories.find((cat) => cat.id === activeTab);

  // Card staggered animation settings
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
  };

  return (
    <section
      id="skills"
      className="py-24 flex flex-col justify-center items-center relative z-10 w-full bg-[#0B0B0B]"
    >
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex flex-col gap-12 px-6"
      >
        {/* Headings */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4F9DFF] font-semibold">
            Capabilities & Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Skills & Expertise
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl">
            Technologies, programming languages, frameworks, and tools I actively work with.
          </p>
          <div className="h-1 w-16 bg-[#4F9DFF] rounded-full mt-2" />
        </div>

        {/* Categories Tab Bar */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide flex">
          <div className="flex gap-2.5 mx-auto md:mx-0 whitespace-nowrap">
            {skillCategories.map((category) => {
              const isActive = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none border border-white/5 hover:border-[#4F9DFF]/30 ${
                    isActive ? "text-black font-bold" : "text-gray-400 hover:text-white"
                  }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#4F9DFF] to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(79,157,255,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
              {activeCategory?.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex"
                >
                  <div
                    className="glass-card rounded-2xl p-6 w-full flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group hover:border-[#4F9DFF]/25 shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-white/5 min-h-[160px]"
                    data-cursor="pointer"
                  >
                    {/* Glowing effect inside card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-[#4F9DFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-full bg-[#4F9DFF]/5 blur-[25px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10" />

                    {/* Skill Icon */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-[#4F9DFF]/30 group-hover:bg-[#4F9DFF]/5 transition-all duration-300 flex items-center justify-center">
                      {skill.icon}
                    </div>

                    {/* Skill Title */}
                    <h3 className="text-sm font-bold text-white font-sans tracking-wide">
                      {skill.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Infinite Skills Marquee */}
        <div className="w-full flex flex-col gap-6 mt-12 border-t border-white/5 pt-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold text-center select-none">
            Technologies & Tools Overview
          </span>
          
          <div className="marquee-container relative py-3 bg-white/[0.01] border-y border-white/5">
            <div className="marquee-content flex items-center select-none">
              {marqueeSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3 shrink-0">
                  <span className="text-sm md:text-base font-bold text-white/50 hover:text-[#4F9DFF] hover:text-glow transition-all duration-300 cursor-default">
                    {skill}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F9DFF]/30 shrink-0" />
                </div>
              ))}
            </div>
            
            {/* Duplicated list for seamless infinite loop */}
            <div className="marquee-content flex items-center select-none" aria-hidden="true">
              {marqueeSkills.map((skill, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-3 shrink-0">
                  <span className="text-sm md:text-base font-bold text-white/50 hover:text-[#4F9DFF] hover:text-glow transition-all duration-300 cursor-default">
                    {skill}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F9DFF]/30 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
