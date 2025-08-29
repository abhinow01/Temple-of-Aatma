"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Heart,
  Compass,
  Sparkles,
  Moon,
  Sun,
  Users,
  Star,
} from "lucide-react";

const tiles = [
  {
    title: "About",
    description: "Discover our sacred journey",
    icon: BookOpen,
    path: "/about",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "Courses",
    description: "Ancient wisdom teachings",
    icon: Sparkles,
    path: "/courses",
    color: "from-purple-400 to-indigo-500",
  },
  {
    title: "Meditations",
    description: "Inner peace practices",
    icon: Moon,
    path: "/meditations",
    color: "from-cyan-400 to-teal-500",
  },
  {
    title: "Community",
    description: "Connect with souls",
    icon: Users,
    path: "/community",
    color: "from-pink-400 to-rose-500",
  },
  {
    title: "Guidance",
    description: "Personal spiritual path",
    icon: Compass,
    path: "/guidance",
    color: "from-emerald-400 to-green-500",
  },
  {
    title: "Healing",
    description: "Transform and renew",
    icon: Heart,
    path: "/healing",
    color: "from-red-400 to-pink-500",
  },
  {
    title: "Rituals",
    description: "Sacred ceremonies",
    icon: Star,
    path: "/rituals",
    color: "from-violet-400 to-purple-500",
  },
  {
    title: "Enlightenment",
    description: "Awaken your truth",
    icon: Sun,
    path: "/enlightenment",
    color: "from-yellow-400 to-amber-500",
  },
];

export default function NavigationTiles() {
  const router = useRouter();

  const handleTileClick = (path) => {
    router.push(path);
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center mb-12"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
        layout="preserve-aspect"
      >
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.title}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer flex items-center justify-center"
              onClick={() => handleTileClick(tile.path)}
              layoutId={`tile-${tile.title}`}
              style={{
                width: "200px",
                height: "200px",
              }}
            >
              {/* Card Background - CIRCLE */}
              <div className="relative w-full h-full p-6 bg-black/30 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tile.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`}
                />

                {/* Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${tile.color} rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-white/20 to-white/10 rounded-full backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-amber-300" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tile.title}
                  </h3>

                  <p className="text-purple-200/70 text-sm leading-relaxed">
                    {tile.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Sacred Symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center mt-16"
        layoutId="sacred-symbol"
      >
        <div className="relative">
          <div className="w-32 h-32 border-2 border-amber-400/30 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 border border-purple-400/30 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 border border-amber-400/20 rotate-45 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
