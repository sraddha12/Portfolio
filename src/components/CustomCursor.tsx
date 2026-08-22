"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfig = { damping: 40, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is desktop
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Ripple click handler
    const handleClick = (e: MouseEvent) => {
      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("click", handleClick);

    // Dynamic Hover Check
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']") ||
        target.getAttribute("data-cursor") === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Magnetic buttons physics

    const handleMagneticMove = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;

      // Distance from center
      const deltaX = e.clientX - elX;
      const deltaY = e.clientY - elY;

      // Pull strength
      const strength = 0.35; 

      // Apply transform offset
      el.style.transform = `translate(${deltaX * strength}px, ${deltaY * strength}px)`;
    };

    const handleMagneticLeave = (el: HTMLElement) => {
      el.style.transform = "translate(0px, 0px)";
    };

    const magneticCleanups: (() => void)[] = [];

    // Set up magnetic listeners
    const setupMagnetic = () => {
      const targets = document.querySelectorAll("[data-magnetic]");
      targets.forEach((target) => {
        const el = target as HTMLElement;
        el.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
        
        const onMouseMove = (e: MouseEvent) => handleMagneticMove(e, el);
        const onMouseLeave = () => handleMagneticLeave(el);

        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);

        magneticCleanups.push(() => {
          el.removeEventListener("mousemove", onMouseMove);
          el.removeEventListener("mouseleave", onMouseLeave);
        });
      });
    };

    // Run setup and check dynamically on DOM updates
    setupMagnetic();
    const observer = new MutationObserver(setupMagnetic);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mouseover", handleMouseOver);
      magneticCleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Follower Ring */}
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent bg-transparent mix-blend-screen pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1.0,
          backgroundColor: isHovered ? "rgba(79, 157, 255, 0.15)" : "rgba(79, 157, 255, 0)",
          borderColor: isHovered ? "#4F9DFF" : "rgba(255, 255, 255, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />

      {/* Inner Pin Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Click Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-click-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  );
}
