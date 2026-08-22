"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // 3D Card Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / (rect.height / 2)) * 6; // Max 6 deg
    const rotateY = (x / (rect.width / 2)) * 6;  // Max 6 deg

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section
      id="about"
      className="min-h-screen py-24 flex items-center justify-center relative px-6 z-10"
    >
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Get To Know
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            About Me
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        </div>

        {/* Content Grid */}
        {/* Content Grid */}
        <div className="flex flex-col gap-8">
          {/* Row 1: Profile Card + Story Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Profile Card */}
            <motion.div
              className="md:col-span-4 flex"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div
                className="glass-card rounded-2xl p-4 flex flex-col items-center justify-between w-full relative overflow-hidden group border border-accent/10 shadow-[0_20px_50px_rgba(79,157,255,0.05)]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Soft ambient corner light */}
                <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-accent/5 blur-[50px] pointer-events-none -z-10 group-hover:bg-accent/10 transition-colors" />

                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/5 group-hover:border-accent/30 transition-colors">
                  <Image
                    src="/profile/avatar.jpg"
                    alt="Sraddha Kanuparthy"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
                <div className="w-full py-3 text-center flex flex-col gap-1">
                  <h3 className="text-base font-bold text-white font-display">
                    Sraddha Kanuparthy
                  </h3>
                  <p className="text-[9px] text-accent uppercase font-bold tracking-widest">
                    AI Developer & Cybersecurity Enthusiast
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: My Story */}
            <motion.div
              className="md:col-span-8 flex"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.15 }}
            >
              <div
                className="glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-6 w-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-white tracking-wide font-display">
                    My Story
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    I am a passionate software engineer specializing in artificial intelligence and cybersecurity. I thrive at the intersection of complex algorithms and system integrity, designing secure, intelligent architectures that defend and optimize.
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">
                    My engineering philosophy centers on clean code, robust security paradigms, and proactive learning. With experience in adaptive machine learning systems and deep cloud technologies, I build scalable web platforms and anomaly-detection models designed to withstand the threats of tomorrow.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-accent" />
                    <span className="text-xs md:text-sm text-gray-400 font-medium">India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-accent" />
                    <span className="text-xs md:text-sm text-gray-400 font-medium">Full-time / Internships</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Education + Core Interests */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Education */}
            <motion.div
              className="md:col-span-7 flex flex-col gap-6"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.25 }}
            >
              <div
                className="glass-card rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-accent/5 blur-[30px] pointer-events-none -z-10" />
                
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                    <GraduationCap size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Education
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Geethanjali */}
                  <div className="flex flex-col gap-0.5">
                    <h4 className="text-sm font-semibold text-white">
                      Geethanjali College Of Engineering And Technology
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      B.Tech | Computer Science & Engineering
                    </p>
                    <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                      CGPA: 8.5
                    </p>
                  </div>
                  
                  {/* Resonance */}
                  <div className="flex flex-col gap-0.5 pt-3 border-t border-white/5">
                    <h4 className="text-sm font-semibold text-white">
                      Resonance Junior College, Hyderabad
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      Senior Secondary (XII) | MPC
                    </p>
                    <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                      Score: 96.00%
                    </p>
                  </div>

                  {/* Foster Billabong */}
                  <div className="flex flex-col gap-0.5 pt-3 border-t border-white/5">
                    <h4 className="text-sm font-semibold text-white">
                      Foster Billabong High International School
                    </h4>
                    <p className="text-[11px] text-gray-400">
                      CBSE
                    </p>
                    <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">
                      Score: 96%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Core Interests */}
            <motion.div
              className="md:col-span-5 flex flex-col gap-6"
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.35 }}
            >
              <div
                className="glass-card rounded-2xl p-8 flex flex-col gap-5"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                    <BookOpen size={18} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Core Interest Areas
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-300">
                      Real-time AI and Cybersecurity defense layers
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-300">
                      Interactive simulations and chaotic system modeling
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-300">
                      Cloud architectures and distributed network security
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
