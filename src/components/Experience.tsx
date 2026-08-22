"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";

interface ExpItem {
  title: string;
  company: string;
  period: string;
  status: string;
  description: string[];
}

const experiences: ExpItem[] = [
  {
    title: "Software Engineering Intern",
    company: "YugaYatra Retail",
    period: "May 2026 – July 2026",
    status: "Completed",
    description: [
      "Contributed to software development as a Software Engineering Intern at YugaYatra Retail, enhancing team output.",
      "Collaborated with the development team and contributed to software development initiatives.",
    ],
  },
  {
    title: "AI & Cloud Technologies Intern",
    company: "IBM Internship",
    period: "Jan 2025 – April 2025",
    status: "Completed",
    description: [
      "Completed a 3-month IBM internship on 'AI & Cloud Technologies'.",
      "Explored deep structures of Cloud platforms and trained neural models for predictive classification.",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section
      id="experience"
      className="py-24 flex items-center justify-center relative px-6 z-10 bg-gradient-to-b from-[#050816] to-[#040611]"
    >
      <div
        ref={containerRef}
        className="w-full max-w-4xl flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            My Professional Path
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Experience
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-12 py-4">
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-8 md:pl-10"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            >
              {/* Timeline Indicator Circle */}
              <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full border border-accent bg-[#050816] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>

              {/* Experience Card */}
              <div
                className="glass-card rounded-2xl p-6 md:p-8 flex flex-col gap-4 relative overflow-hidden group hover:border-accent/20 transition-all duration-300"
                data-cursor="pointer"
              >
                {/* Subtle light effect on card hover */}
                <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-accent/5 blur-[40px] pointer-events-none -z-10 group-hover:bg-accent/10 transition-colors" />

                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white font-display flex items-center gap-2">
                      <Briefcase size={16} className="text-accent" />
                      {exp.title}
                    </h3>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider self-start ${
                    exp.status === "Completed"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-accent/10 border border-accent/20 text-accent"
                  }`}>
                    <CheckCircle size={10} />
                    {exp.status}
                  </div>
                </div>

                {/* Period */}
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Calendar size={13} className="text-gray-500" />
                  {exp.period}
                </div>

                {/* Description Bullets */}
                <ul className="flex flex-col gap-2.5 mt-2 border-t border-white/5 pt-4">
                  {exp.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-1.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-300 leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
