"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const TIPS = [
  "When solving word problems, underline the key numbers and circle what the question is asking for.",
  "For synonyms, try using the word in a sentence first, then swap in each option to see which fits best.",
  "In Non-Verbal Reasoning, always check all four sides of a shape — not just the obvious ones.",
  "For number sequences, find the gap between the first two numbers before looking at the rest.",
  "Read comprehension passages twice — once for the story, once for the details you'll be tested on.",
];

export function DailyTip() {
  const tip = TIPS[new Date().getDay() % TIPS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="relative overflow-hidden rounded-2xl px-5 py-3"
      style={{
        background: "linear-gradient(135deg, #fdf6e0 0%, #fbf1d3 100%)",
        border: "1px solid rgba(201,148,26,0.3)",
        boxShadow: "0 4px 16px rgba(60,47,0,0.06)",
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ background: "rgba(201,148,26,0.15)", filter: "blur(20px)" }} />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,148,26,0.12)", border: "1px solid rgba(201,148,26,0.25)" }}>
            <Lightbulb className="w-4 h-4" style={{ color: "#a87810" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#a87810", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
              Tip of the Day
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#5b554a" }}>{tip}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
