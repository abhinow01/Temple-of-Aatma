"use client";

import { motion } from "framer-motion";
import NavigationTiles from "./(landing)/components/NavigationTiles";
import TemplePortal from "./(landing)/components/TemplePortal";
import MissionCard from "./(landing)/components/MissionCard";
export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      {/* PERSISTENT KRISHNA BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <TemplePortal />
        {/* subtle readability veil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      {/* SECTION 1 — MISSION */}
      <section className="relative h-screen flex items-center justify-center w-full ">
        <MissionCard />
      </section>

      {/* SECTION 2 — TILES */}
      <section className="relative min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="w-full"
        >
          <NavigationTiles />
        </motion.div>
      </section>

      {/* Sacred Geometry Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-amber-400/20 rotate-45 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-400/20 rotate-12 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 border border-cyan-400/20 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}

