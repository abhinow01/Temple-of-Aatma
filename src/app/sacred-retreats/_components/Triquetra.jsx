"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Triquetra() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null); // 🟣 new state for hover
  const [isMobile, setIsMobile] = useState(false);

  const sections = [
    {
      id: 1,
      label: "Retreats",
      href: "/sacred-retreats/yatras",
      color: "#e8d4d8",
      description: "Sacred spaces for transformation",
    },
    {
      id: 2,
      label: "Meditations",
      href: "/meditations",
      color: "#d4e8e4",
      description: "Journey within",
    },
    {
      id: 3,
      label: "Stay",
      href: "/stay",
      color: "#f2e4dc",
      description: "Rest and renewal",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % sections.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + sections.length) % sections.length);
  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % sections.length);

  const currentSection = sections[hoverIndex ?? activeIndex];

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen w-full bg-gradient-to-br from-[#faf9f7] via-[#f5f3f0] to-[#f0ebe6] overflow-hidden">
      {/* Soft background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_transparent_50%,_rgba(0,0,0,0.02)_100%)]"
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-6 md:top-10 text-center px-4"
      >
        <h1 className="text-2xl md:text-4xl font-light tracking-[0.3em] text-[#8b7b6f] mb-1">
          SACRED
        </h1>
        <p className="text-[10px] md:text-sm font-light tracking-[0.4em] text-[#a99a8d]">
          JOURNEY WITH OUR RETREATS 
        </p>
      </motion.div>

      {isMobile ? (
        /* === MOBILE VIEW === */
        <div className="relative w-full max-w-md px-8 mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="relative flex flex-col items-center justify-center py-12 px-8 rounded-full aspect-square"
                style={{
                  background: `linear-gradient(135deg, ${currentSection.color}40, ${currentSection.color}80)`,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(currentSection.href)}
              >
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full opacity-20"
                >
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="85"
                    fill="none"
                    stroke={currentSection.color}
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M100,30 L40,130 L160,130 L100,30 Z"
                    fill="none"
                    stroke={currentSection.color}
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                  />
                </svg>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10 text-center"
                >
                  <h2 className="text-4xl md:text-5xl font-light tracking-[0.2em] text-[#6b5b4f] mb-3">
                    {currentSection.label}
                  </h2>
                  <p className="text-sm md:text-base font-light tracking-[0.15em] text-[#8b7b6f]">
                    {currentSection.description}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm"
            >
              <ChevronLeft className="w-5 h-5 text-[#8b7b6f]" />
            </motion.button>

            <div className="flex gap-2">
              {sections.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.9 }}
                >
                  <Circle
                    className={`w-2 h-2 transition-all duration-300 ${
                      index === activeIndex
                        ? "fill-[#8b7b6f] text-[#8b7b6f]"
                        : "fill-[#d4c4b8] text-[#d4c4b8]"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="p-2 rounded-full bg-white/50 backdrop-blur-sm shadow-sm"
            >
              <ChevronRight className="w-5 h-5 text-[#8b7b6f]" />
            </motion.button>
          </div>
        </div>
      ) : (
        /* === DESKTOP VIEW === */
        <div className="relative w-full max-w-2xl px-4 mt-20">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Outer circle */}
            <motion.circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="#d4c4b8"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Triangles */}
            <motion.path
              d="M200,80 L100,280 L300,280 L200,80 Z"
              fill="none"
              stroke="#c4b4a8"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.2 }}
            />
            <motion.path
              d="M200,320 L100,120 L300,120 L200,320 Z"
              fill="none"
              stroke="#c4b4a8"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.4 }}
            />

            {/* Center circle */}
            <motion.circle
              cx="200"
              cy="200"
              r="50"
              fill={`${currentSection.color}80`}
              stroke={currentSection.color}
              strokeWidth="0.6"
              animate={{ scale: hoverIndex !== null ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Dynamic center text */}
            <motion.text
              key={currentSection.label}
              x="200"
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontWeight="300"
              letterSpacing="3"
              fill="#6b5b4f"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {currentSection.label.toUpperCase()}
            </motion.text>

            {/* Outer clickable nodes */}
            {sections.map((section, index) => {
              const angle = (index * 120 - 90) * (Math.PI / 180);
              const radius = 150;
              const x = 200 + radius * Math.cos(angle);
              const y = 200 + radius * Math.sin(angle);

              return (
                <g key={section.id}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="35"
                    fill={
                      activeIndex === index || hoverIndex === index
                        ? `${section.color}80`
                        : `${section.color}40`
                    }
                    stroke={section.color}
                    strokeWidth={hoverIndex === index ? "1" : "0.5"}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => {
                      setActiveIndex(index);
                      setTimeout(() => router.push(section.href), 300);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fontWeight="300"
                    letterSpacing="2"
                    fill="#6b5b4f"
                    className="cursor-pointer select-none"
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => {
                      setActiveIndex(index);
                      setTimeout(() => router.push(section.href), 300);
                    }}
                  >
                    {section.label.toUpperCase()}
                  </motion.text>
                </g>
              );
            })}
          </svg>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-6"
          >
            <p className="text-sm font-light tracking-[0.2em] text-[#8b7b6f]">
              {currentSection.description}
            </p>
          </motion.div>
        </div>
      )}

      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 md:bottom-6 text-center"
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] text-[#b4a498] font-light">
          TAP TO EXPLORE • CLICK A PATH TO BEGIN YOUR JOURNEY
        </p>
      </motion.div>
    </div>
  );
}
