"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, CheckCircle2 } from "lucide-react";

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
import confetti from "canvas-confetti";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Form states
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });

    // Success Confetti Splash!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4F9DFF", "#ffffff", "#0D1321"],
    });

    // Reset success message after 4s
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section
      id="contact"
      className="py-24 flex items-center justify-center relative px-6 z-10"
    >
      <div
        ref={containerRef}
        className="w-full max-w-5xl flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
            Let&apos;s Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            Contact
          </h2>
          <div className="h-1 w-16 bg-accent rounded-full mt-2" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Form Card */}
          <motion.div
            className="md:col-span-8 flex"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="glass-card rounded-2xl p-8 w-full relative overflow-hidden flex flex-col justify-between border border-white/5">
              {isSuccess ? (
                // Success State View
                <motion.div
                  className="flex flex-col items-center justify-center text-center my-auto gap-4 py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Thank you for reaching out. I will respond to your inquiry as soon as possible.
                  </p>
                </motion.div>
              ) : (
                // Contact Form
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none text-xs uppercase tracking-wider ${
                          activeField === "name" || form.name
                            ? "-top-2.5 bg-[#050816] px-2 text-accent font-semibold"
                            : "top-4 text-gray-500"
                        }`}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-white/5 bg-[#050816]/40 text-sm text-white focus:border-accent/80 focus:shadow-[0_0_15px_rgba(79,157,255,0.15)] focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none text-xs uppercase tracking-wider ${
                          activeField === "email" || form.email
                            ? "-top-2.5 bg-[#050816] px-2 text-accent font-semibold"
                            : "top-4 text-gray-500"
                        }`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-xl border border-white/5 bg-[#050816]/40 text-sm text-white focus:border-accent/80 focus:shadow-[0_0_15px_rgba(79,157,255,0.15)] focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none text-xs uppercase tracking-wider ${
                        activeField === "subject" || form.subject
                          ? "-top-2.5 bg-[#050816] px-2 text-accent font-semibold"
                          : "top-4 text-gray-500"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-white/5 bg-[#050816]/40 text-sm text-white focus:border-accent/80 focus:shadow-[0_0_15px_rgba(79,157,255,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none text-xs uppercase tracking-wider ${
                        activeField === "message" || form.message
                          ? "-top-2.5 bg-[#050816] px-2 text-accent font-semibold"
                          : "top-4 text-gray-500"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      onChange={handleChange}
                      className="w-full p-4 rounded-xl border border-white/5 bg-[#050816]/40 text-sm text-white focus:border-accent/80 focus:shadow-[0_0_15px_rgba(79,157,255,0.15)] focus:outline-none transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-black font-semibold text-xs uppercase tracking-wider hover:bg-accent/85 transition-all shadow-[0_0_15px_rgba(79,157,255,0.2)] disabled:opacity-50"
                    data-cursor="pointer"
                    data-magnetic
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send size={13} className={isSubmitting ? "animate-pulse" : ""} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: Contact Details Cards */}
          <motion.div
            className="md:col-span-4 flex flex-col gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Quick Email Card */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4 border border-white/5">
              <div className="p-3 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <Mail size={18} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  Direct Email
                </span>
                <a
                  href="mailto:sraddhakanuparthy@gmail.com"
                  className="text-xs md:text-sm text-gray-300 hover:text-white font-medium transition-colors"
                  data-cursor="pointer"
                >
                  sraddhakanuparthy@gmail.com
                </a>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-5 border border-white/5">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                Social Networks
              </span>
              
              <div className="flex flex-col gap-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/sraddha-kanuparthy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-accent/5 hover:border-accent/25 transition-all group"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={16} className="text-gray-400 group-hover:text-accent transition-colors" />
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                      LinkedIn
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 group-hover:text-accent transition-colors font-bold uppercase">
                    Connect
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/sraddha12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-accent/5 hover:border-accent/25 transition-all group"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <Github size={16} className="text-gray-400 group-hover:text-accent transition-colors" />
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                      GitHub
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 group-hover:text-accent transition-colors font-bold uppercase">
                    Follow
                  </span>
                </a>

              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
