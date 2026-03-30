"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agents = [
  { name: "Ace", color: "#3B82F6", msg: "PR #42 is ready for review" },
  { name: "Mia", color: "#EC4899", msg: "Draft blog post is done" },
  { name: "Rex", color: "#10B981", msg: "Dataset pulled — 12k rows" },
];

export default function NowPlayingQueue() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % agents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xs bg-white/[0.03] backdrop-blur-md border border-white/[0.06] rounded-2xl p-4 space-y-3">
      {agents.map((agent, i) => {
        const isActive = i === activeIndex;
        return (
          <AnimatePresence key={agent.name} mode="wait">
            <motion.div
              key={`${agent.name}-${isActive}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isActive ? "" : "border-[1.5px]"}`}
                style={{
                  backgroundColor: isActive ? agent.color : "transparent",
                  borderColor: isActive ? undefined : agent.color,
                  boxShadow: isActive ? `0 0 8px ${agent.color}` : undefined,
                }}
              />
              <span className="text-xs font-medium" style={{ color: agent.color }}>
                {agent.name}
              </span>
              <span className="text-xs text-zinc-500 truncate">
                &quot;{agent.msg}&quot;
              </span>
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
