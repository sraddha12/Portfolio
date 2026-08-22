"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

interface NavItem {
  name: string;
  id: string;
  isButton?: boolean;
}

const navItems: NavItem[] = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Certifications", id: "certifications" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide/Show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if page is scrolled down at all
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track active section using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className={`fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <nav
              className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border border-white/5 transition-all duration-300 ${
                isScrolled
                  ? "glass-panel shadow-[0_10px_30px_rgba(5,8,22,0.6)] py-2.5"
                  : "bg-white/5 backdrop-blur-sm"
              }`}
            >
              {/* Logo / Initials */}
              <button
                onClick={() => handleNavClick("home")}
                className="text-xl font-bold tracking-wider font-display text-white focus:outline-none flex items-center gap-1.5"
                data-cursor="pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                SK
              </button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-300 focus:outline-none ${
                      activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                    data-cursor="pointer"
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-accent/15 border border-accent/20 rounded-full -z-10 shadow-[0_0_20px_rgba(79,157,255,0.15)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </button>
                ))}

                {/* Resume button */}
                <a
                  href="/resume.pdf"
                  download="Sraddha_Kanuparthy_Resume.pdf"
                  className="ml-3 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black bg-accent rounded-full hover:bg-accent/80 transition-all shadow-[0_0_15px_rgba(79,157,255,0.3)] focus:outline-none hover:shadow-[0_0_25px_rgba(79,157,255,0.5)]"
                  data-cursor="pointer"
                  data-magnetic
                >
                  <FileText size={13} />
                  Resume
                </a>
              </div>

              {/* Mobile Hamburger Toggle */}
              <div className="md:hidden flex items-center gap-3">
                <a
                  href="/resume.pdf"
                  download="Sraddha_Kanuparthy_Resume.pdf"
                  className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-black bg-accent rounded-full hover:bg-accent/80 transition-all focus:outline-none"
                >
                  Resume
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1.5 text-gray-400 hover:text-white focus:outline-none bg-white/5 rounded-full border border-white/5"
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-2xl font-bold uppercase tracking-widest font-display focus:outline-none ${
                    activeSection === item.id ? "text-accent text-glow" : "text-gray-400"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
