"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Shield, Layout, AwardIcon, Coffee } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  badge?: string;
  icon: React.ReactNode;
  accentColor: string;
}

const certifications: Certification[] = [
  {
    title: "Cyber Security with AI",
    issuer: "Internshala",
    icon: <Shield className="text-rose-400" size={20} />,
    accentColor: "rgba(239, 68, 68, 0.15)",
  },
  {
    title: "Web Development with AI",
    issuer: "Internshala",
    icon: <Layout className="text-sky-400" size={20} />,
    accentColor: "rgba(56, 189, 248, 0.15)",
  },
  {
    title: "Java Programming",
    issuer: "NPTEL (Gold Medal)",
    badge: "Gold Medalist",
    icon: <AwardIcon className="text-amber-400" size={20} />,
    accentColor: "rgba(251, 191, 36, 0.15)",
  },
  {
    title: "C For Everybody",
    issuer: "Udemy",
    icon: <Coffee className="text-violet-400" size={20} />,
    accentColor: "rgba(167, 139, 250, 0.15)",
  },
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Tilt helpers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section
      id="certifications"
      className="py-24 flex items-center justify-center relative px-6 z-10 bg-gradient-to-b from-[#040611] to-[#050816]"
    >
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Verified Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Certifications
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="flex"
            >
              <div
                className="glass-card rounded-2xl p-6 md:p-8 w-full flex items-center justify-between gap-6 relative overflow-hidden group hover:border-accent/15 transition-all"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
                data-cursor="pointer"
              >
                {/* Dynamically colored background lighting glow */}
                <div
                  className="absolute top-0 right-0 w-[140px] h-[140px] rounded-full blur-[35px] pointer-events-none -z-10 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: cert.accentColor,
                    opacity: 0.4,
                  }}
                />

                {/* Left contents */}
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 group-hover:border-accent/20 group-hover:bg-accent/5 transition-all">
                    {cert.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base md:text-lg font-bold text-white font-display leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                {/* Right Special Badge (e.g. Gold Medalist) */}
                {cert.badge && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-bold uppercase tracking-wider select-none shrink-0 self-center">
                    <Award size={10} />
                    {cert.badge}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
