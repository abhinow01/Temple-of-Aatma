"use client";
import { motion } from "framer-motion";
export default function MissionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full"
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm ">
        {/* Content */}
        <div className="relative p-8 md:p-12 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r text-white/90 bg-clip-text ">
            Our Sacred Mission
          </h1>

          <p className="mt-6 text-base md:text-xl text-white/90 leading-relaxed">
            To guide seekers on their journey of self-realization, awakening, and spiritual
            connection through wisdom, rituals, and community—opening a path of devotion,
            service, and inner harmony.
          </p>

          {/* scroll hint */}
          <motion.div
            className="mt-12 text-purple-200/80 text-sm"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓ Scroll to explore ↓
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
