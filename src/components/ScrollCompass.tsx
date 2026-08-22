"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

interface Waypoint {
  id: string;
  name: string;
}

const sections: Waypoint[] = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Experience" },
  { id: "certifications", name: "Certifications" },
  { id: "contact", name: "Contact" },
];

// Mini Compass Rose SVG component for track endpoints
const TrackCompassRose = () => (
  <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#c5a059]/40 opacity-80 pointer-events-none select-none my-1">
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
    {/* Compass points */}
    <polygon points="50,12 53,47 47,47" fill="currentColor" />
    <polygon points="50,88 53,53 47,53" fill="currentColor" />
    <polygon points="88,50 53,53 53,47" fill="currentColor" />
    <polygon points="12,50 47,53 47,47" fill="currentColor" />
    {/* Diagonal indicators */}
    <line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" strokeWidth="0.5" />
    <line x1="22" y1="78" x2="78" y2="22" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

export default function ScrollCompass() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompassHovered, setIsCompassHovered] = useState(false);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<number | null>(null);
  const [needleRotation, setNeedleRotation] = useState(0);
  const lenis = useLenis();

  // Track window scroll progress for smooth positioning
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update scroll progress when Lenis scrolls (ensures perfect synchronization)
  useEffect(() => {
    if (!lenis) return;
    const onScroll = () => {
      setProgress(lenis.progress);
    };
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  // Track active section using Intersection Observer and trigger compass needle spin
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when the section dominates the viewport center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newSection = entry.target.id;
          setActiveSection(newSection);

          // Trigger magnetic compass needle spin and settle on new section entry
          const randomDrift = (Math.random() - 0.5) * 45; // -22.5deg to +22.5deg
          setNeedleRotation((prev) => prev + 360 + randomDrift);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleWaypointClick = (id: string) => {
    if (lenis) {
      lenis.scrollTo("#" + id, { duration: 1.2 });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Magnetic needle tilt behavior when hovering over waypoints
  const handleWaypointHoverStart = (index: number) => {
    setHoveredWaypoint(index);
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    
    setNeedleRotation((prev) => {
      const baseRotation = Math.round(prev / 360) * 360;
      if (index < currentIndex) {
        // Waypoint is above: point needle upwards (-45 degrees offset)
        return baseRotation - 45;
      } else if (index > currentIndex) {
        // Waypoint is below: point needle downwards (135 degrees offset)
        return baseRotation + 135;
      } else {
        // Hovering current active section waypoint: point straight North
        return baseRotation;
      }
    });
  };

  const handleWaypointHoverEnd = () => {
    setHoveredWaypoint(null);
    // Settle needle back to dial North with slight random resting bounce
    setNeedleRotation((prev) => {
      const baseRotation = Math.round(prev / 360) * 360;
      return baseRotation + (Math.random() - 0.5) * 10;
    });
  };

  return (
    <div className="fixed right-4 md:right-8 top-[10vh] bottom-[10vh] w-12 md:w-16 z-[990] flex flex-col items-center justify-between pointer-events-none">
      
      {/* 1. Decorative Compass Rose at Very Top */}
      <div className="absolute -top-7 pointer-events-none">
        <TrackCompassRose />
      </div>

      {/* Main Track Wrapper */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30px] flex items-center justify-center">
        
        {/* Soft sapphire-blue magical glow behind the line */}
        <div className="absolute inset-y-0 w-[8px] bg-[#4F9DFF]/5 blur-[6px] rounded-full pointer-events-none" />

        {/* BRASS NAVIGATION PATH LINE (Weathered base) */}
        <div className="absolute inset-y-0 w-[4px] bg-gradient-to-b from-[#4d3c2a] via-[#856b50] to-[#4d3c2a] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
          
          {/* ILLUMINATED PROGRESS LINE (Magical Sapphire Blue) */}
          <motion.div
            className="absolute top-0 w-full bg-gradient-to-b from-[#4F9DFF] via-indigo-500 to-[#4F9DFF] shadow-[0_0_15px_rgba(79,157,255,0.95)]"
            style={{ height: `${progress * 100}%` }}
          />
        </div>

        {/* Engraved coordinate markers/ticks along the brass track */}
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[6px] h-[1px] bg-[#362a1c]/80 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ top: `${i * 5}%` }}
          />
        ))}

        {/* 2. ENGRAVED CIRCULAR WAYPOINTS */}
        {sections.map((sec, index) => {
          const isActive = sec.id === activeSection;
          const isCurrentHovered = hoveredWaypoint === index;
          const posPercent = (index / (sections.length - 1)) * 100;
          
          return (
            <div
              key={sec.id}
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{ top: `${posPercent}%` }}
            >
              {/* Waypoint circle button */}
              <button
                onClick={() => handleWaypointClick(sec.id)}
                onMouseEnter={() => handleWaypointHoverStart(index)}
                onMouseLeave={handleWaypointHoverEnd}
                className="w-7 h-7 rounded-full flex items-center justify-center pointer-events-auto bg-transparent border-none outline-none focus:outline-none"
                data-cursor="pointer"
                aria-label={`Scroll to ${sec.name}`}
              >
                {/* Visual marker: circular antique brass plate with glowing gemstone core */}
                <motion.div
                  className={`rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? "w-[15px] h-[15px] border-[#4F9DFF] bg-[#4F9DFF]/20 shadow-[0_0_10px_rgba(79,157,255,0.7)]" 
                      : "w-[11px] h-[11px] border-[#8a7355]/40 bg-[#2b1f14] hover:border-[#c5a059] hover:bg-[#3d2e20]"
                  }`}
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  {/* Central glowing gemstone core */}
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive 
                        ? "w-1.5 h-1.5 bg-[#4F9DFF]" 
                        : "w-1 h-1 bg-[#8a7355]/20 group-hover:bg-[#c5a059]/40"
                    }`}
                  />
                </motion.div>
              </button>

              {/* Waypoint active ripple ping */}
              {isActive && (
                <span className="absolute w-7 h-7 rounded-full border border-[#4F9DFF]/30 animate-ping pointer-events-none" />
              )}

              {/* Floating Glass Tooltip on Hover */}
              <AnimatePresence>
                {isCurrentHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: -8, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="absolute right-[22px] px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/85 backdrop-blur-md text-[10px] font-bold text-white tracking-widest uppercase whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center gap-2 select-none pointer-events-none z-50"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4F9DFF] animate-pulse" />
                    {sec.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 3. Floating Explorer's Compass Head */}
      <div className="absolute top-0 bottom-0 left-0 right-0">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center"
          style={{ top: `${progress * 100}%` }}
          animate={{ scale: isCompassHovered ? 1.1 : 1.0 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onMouseEnter={() => setIsCompassHovered(true)}
          onMouseLeave={() => setIsCompassHovered(false)}
          data-cursor="pointer"
          data-magnetic
        >
          {/* Compass name banner tooltip */}
          <AnimatePresence>
            {isCompassHovered && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: -8, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                className="absolute right-[70px] px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/85 backdrop-blur-md text-xs font-bold text-white tracking-widest uppercase whitespace-nowrap shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center gap-2 select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#4F9DFF] animate-pulse" />
                {sections.find((s) => s.id === activeSection)?.name || "Home"}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compass housing: Weathered bronze & antique brass double-bezel */}
          <div className="w-[46px] h-[46px] md:w-[56px] md:h-[56px] rounded-full border-2 border-[#856b50]/80 bg-gradient-to-br from-[#c5a059]/40 via-[#2d2218]/95 to-[#856b50]/50 backdrop-blur-xs shadow-[0_15px_45px_rgba(0,0,0,0.8),_0_0_20px_rgba(79,157,255,0.15)] flex items-center justify-center relative overflow-hidden group">
            
            {/* Museum crystal glass reflection glaze */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30" />
            <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,0.05)_50%,transparent_50%)] pointer-events-none" />

            {/* Inner dial plate */}
            <div className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] rounded-full bg-slate-950 border border-[#856b50]/30 flex items-center justify-center relative">
              
              {/* Dial coordinate lines & astronomical markings */}
              <svg viewBox="0 0 100 100" className="absolute inset-2 text-[#c5a059]/10 pointer-events-none z-0">
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
                <line x1="18" y1="18" x2="82" y2="82" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                <line x1="18" y1="82" x2="82" y2="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                <polygon points="50,15 52,48 48,48" fill="currentColor" />
                <polygon points="50,85 52,52 48,52" fill="currentColor" />
                <polygon points="85,50 52,52 52,48" fill="currentColor" />
                <polygon points="15,50 48,52 48,48" fill="currentColor" />
              </svg>

              {/* Cardinal Directions */}
              <span className="absolute top-0.5 text-[6px] md:text-[7px] font-bold text-[#c5a059]/80 tracking-wider z-10 select-none">N</span>
              <span className="absolute right-1 text-[6px] md:text-[7px] font-bold text-[#c5a059]/30 tracking-wider z-10 select-none">E</span>
              <span className="absolute bottom-0.5 text-[6px] md:text-[7px] font-bold text-[#c5a059]/30 tracking-wider z-10 select-none">S</span>
              <span className="absolute left-1 text-[6px] md:text-[7px] font-bold text-[#c5a059]/30 tracking-wider z-10 select-none">W</span>

              {/* Sapphire center crystal core */}
              <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gradient-to-br from-[#4F9DFF] to-indigo-600 shadow-[0_0_8px_rgba(79,157,255,0.85)] border border-[#4F9DFF]/60 z-20" />

              {/* Rotating Diamond needle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                animate={{ rotate: needleRotation }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Top sapphire needle pointer */}
                  <polygon points="50,12 53.5,50 46.5,50" fill="#4F9DFF" />
                  {/* Bottom silver/brass needle pointer */}
                  <polygon points="50,88 53.5,50 46.5,50" fill="#c5a059" opacity="0.8" />
                </svg>
              </motion.div>
            </div>
            
            {/* Bezel details */}
            <div className="absolute inset-0.5 rounded-full border border-[#c5a059]/10 pointer-events-none -z-10" />
          </div>

          {/* Ambient magical sapphire dust (Particles) */}
          <div className="absolute inset-0 pointer-events-none -z-20">
            <motion.span
              animate={{ y: [-3, 3, -3], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-1 left-2 w-1 h-1 rounded-full bg-[#4F9DFF]/40 blur-[0.5px]"
            />
            <motion.span
              animate={{ y: [4, -4, 4], opacity: [0.2, 0.6, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute bottom-2 right-1 w-0.5 h-0.5 rounded-full bg-[#4F9DFF]/40 blur-[0.5px]"
            />
            <motion.span
              animate={{ x: [-3, 3, -3], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute top-1/2 -right-2 w-1 h-1 rounded-full bg-[#4F9DFF]/30 blur-[0.5px]"
            />
          </div>

        </motion.div>
      </div>

      {/* 4. Decorative Compass Rose at Very Bottom */}
      <div className="absolute -bottom-7 pointer-events-none">
        <TrackCompassRose />
      </div>

    </div>
  );
}
