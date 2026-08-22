"use client";

import React, { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollCompass from "@/components/ScrollCompass";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Background canvas and custom cursor load immediately */}
      <ThreeBackground />
      <CustomCursor />
      
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <SmoothScrollProvider>
          <div className="relative min-h-screen text-white select-none">
            <Navbar />
            <ScrollCompass />
            <main className="flex flex-col w-full">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      )}
    </>
  );
}
