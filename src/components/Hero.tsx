"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Send } from "lucide-react";

const roles = ["AI Developer", "Cybersecurity Enthusiast"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing machine logic
  useEffect(() => {
    const activeStr = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentRole(activeStr.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 50); // Deleting speed
    } else {
      timer = setTimeout(() => {
        setCurrentRole(activeStr.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 90); // Typing speed
    }

    if (!isDeleting && charIndex === activeStr.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before delete
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative px-6 overflow-hidden pt-20"
    >
      {/* Background soft blue radial glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-accent/10 blur-[80px] md:blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/5 blur-[80px] md:blur-[100px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center select-none">
        
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-6 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Available for Opportunities
        </motion.div>

        {/* Hello Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-gray-300 mb-4"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Large Typography Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-6 font-display text-white select-none relative"
        >
          Sraddha <span className="text-gradient-accent">Kanuparthy</span>
        </motion.h1>

        {/* Typing Roles Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-8 md:h-12 flex items-center justify-center mb-10"
        >
          <p className="text-lg md:text-3xl font-light text-gray-300 font-sans tracking-wide">
            I am a <span className="font-medium text-white border-r-2 border-accent/80 pr-1 animate-pulse">{currentRole}</span>
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          {/* View Projects */}
          <button
            onClick={() => scrollToSection("projects")}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-accent rounded-full hover:bg-accent/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,157,255,0.25)] hover:shadow-[0_0_30px_rgba(79,157,255,0.45)] focus:outline-none"
            data-cursor="pointer"
            data-magnetic
          >
            View Projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Download Resume */}
          <a
            href="/resume.pdf"
            download="Sraddha_Kanuparthy_Resume.pdf"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/10 bg-white/5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all focus:outline-none"
            data-cursor="pointer"
            data-magnetic
          >
            Download Resume
            <Download size={14} />
          </a>

          {/* Contact Me */}
          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white border border-transparent rounded-full hover:bg-white/5 transition-all focus:outline-none"
            data-cursor="pointer"
            data-magnetic
          >
            Contact Me
            <Send size={14} />
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer"
        data-cursor="pointer"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-medium">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}
