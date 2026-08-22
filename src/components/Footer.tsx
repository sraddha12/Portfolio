"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";

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

// Inline Custom Linkedin Icon (since lucide brand icons are removed in version 1+)
const Linkedin = ({ size = 24, ...props }: CustomIconProps) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full py-12 border-t border-white/5 bg-[#050816] px-6 relative z-10 select-none">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-xs text-gray-500 font-sans tracking-wide">
            &copy; 2026 Sraddha Kanuparthy. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 font-sans">
            Designed & Engineered with Next.js 15, Framer Motion & Three.js.
          </p>
        </div>

        {/* Right Side: Social icons & Scroll Up */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-500">
            <a
              href="https://www.linkedin.com/in/sraddha-kanuparthy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              data-cursor="pointer"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://github.com/sraddha12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              data-cursor="pointer"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="mailto:sraddhakanuparthy@gmail.com"
              className="hover:text-white transition-colors"
              data-cursor="pointer"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center justify-center p-3 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:border-accent/30 hover:bg-accent/5 transition-all"
            data-cursor="pointer"
            data-magnetic
            aria-label="Scroll to top"
          >
            <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
