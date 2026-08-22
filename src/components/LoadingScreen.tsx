"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1600; // Total duration in ms
    const stepTime = 16;   // ~60 FPS update interval
    const totalSteps = duration / stepTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      // Easing progress calculation for natural feel (accelerates then slows down)
      const progressRatio = step / totalSteps;
      const easedProgress = Math.round(
        100 * (1 - Math.pow(1 - progressRatio, 3))
      );

      if (easedProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          // Wait for exit transition to complete before triggering callback
          setTimeout(onComplete, 800);
        }, 400);
      } else {
        setProgress(Math.min(easedProgress, 99));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="fixed inset-0 bg-[#050816] z-[99999] flex flex-col justify-between p-10 lg:p-20"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100vh",
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top header - Status */}
          <div className="flex justify-between items-center w-full">
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-gray-500 font-sans"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              System Initialization
            </motion.span>
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-accent font-sans"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ver. 2026.8
            </motion.span>
          </div>

          {/* Central Initials Showcase */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <motion.h1
                className="text-8xl md:text-[12rem] font-bold text-white font-display select-none tracking-tight text-glow"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                SK
              </motion.h1>
              {/* Outer circular blue pulse */}
              <motion.div
                className="absolute inset-0 border border-accent/20 rounded-full scale-125 -z-10"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.4, 1.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-xs tracking-[0.4em] text-gray-400 mt-4 uppercase font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
            >
              Sraddha Kanuparthy
            </motion.p>
          </div>

          {/* Bottom - Progress Counter & Bar */}
          <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-sans">
                Loading resources...
              </span>
              <motion.span
                className="text-4xl md:text-5xl font-bold text-accent font-display"
                layout
              >
                {progress}%
              </motion.span>
            </div>
            
            {/* Loading Bar Container */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-accent/50 to-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Glowing highlight point on loading bar edge */}
              <motion.div
                className="absolute top-0 bottom-0 w-8 bg-accent/80 blur-sm"
                style={{ left: `calc(${progress}% - 32px)` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
