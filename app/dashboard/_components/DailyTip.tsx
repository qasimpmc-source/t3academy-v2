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
        background: "linear-gradient(135deg, #3a2800 0%, #1e1600 80%, #2d1e00 100%)",
        border: "1px solid rgba(233,195,73,0.25)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ background: "rgba(233,195,73,0.12)", filter: "blur(20px)" }} />

      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(233,195,73,0.15)", border: "1px solid rgba(233,195,73,0.2)" }}>
            <Lightbulb className="w-4 h-4" style={{ color: "#e9c349" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#e9c349", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
              Tip of the Day
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#bfc9c3" }}>{tip}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
