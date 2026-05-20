"use client";

import { motion } from "framer-motion";
import { BookOpen, Calculator, MessageCircle, Shapes, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface SubjectStat {
  done: number;
  accuracy: number | null;
  pct: number;
}

interface Props {
  stats: Record<string, SubjectStat>;
}

const SUBJECTS = [
  {
    id: "english", name: "English", topics: 6, icon: BookOpen,
    gradient: "from-violet-500 to-purple-600",
    bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
    accentBorder: "rgba(139,92,246,0.35)",
    iconBg: "#ede9fe", textColor: "#6d28d9",
    progressColor: "#7c3aed", illustration: "📚",
  },
  {
    id: "maths", name: "Maths", topics: 6, icon: Calculator,
    gradient: "from-blue-500 to-cyan-500",
    bg: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)",
    accentBorder: "rgba(59,130,246,0.35)",
    iconBg: "#dbeafe", textColor: "#1d4ed8",
    progressColor: "#1d6fdb", illustration: "🔢",
  },
  {
    id: "verbal", name: "Verbal Reasoning", topics: 7, icon: MessageCircle,
    gradient: "from-emerald-500 to-teal-500",
    bg: "linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)",
    accentBorder: "rgba(16,185,129,0.35)",
    iconBg: "#dcfce7", textColor: "#15803d",
    progressColor: "#0f7d4b", illustration: "💬",
  },
  {
    id: "nvr", name: "Non-Verbal Reasoning", topics: 7, icon: Shapes,
    gradient: "from-amber-500 to-orange-500",
    bg: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)",
    accentBorder: "rgba(245,158,11,0.35)",
    iconBg: "#fef3c7", textColor: "#d97706",
    progressColor: "#c2720a", illustration: "🧩",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 12 } },
};

export function SubjectCardsNew({ stats }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #f59e0b, #ea580c)" }} />
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--color-text3)" }}>
          Choose Your Adventure
        </h2>
        <Sparkles className="w-4 h-4 text-amber-500" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {SUBJECTS.map((subject, index) => {
          const s = stats[subject.id];
          const done = s?.done ?? 0;
          const accuracy = s?.accuracy ?? null;
          const pct = s?.pct ?? 0;

          return (
            <motion.div key={subject.id} variants={cardVariants}
              whileHover={{ scale: 1.02, y: -6, transition: { type: "spring", stiffness: 300 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/dashboard/${subject.id}`}
                className="relative block overflow-hidden rounded-2xl p-4 no-underline group"
                style={{
                  background: subject.bg,
                  border: `2px solid ${subject.accentBorder}`,
                  boxShadow: "0 4px 20px rgba(28,24,18,0.08)",
                  transition: "box-shadow 0.2s",
                }}
              >
                {/* Animated progress bar at top */}
                <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden rounded-t-[2rem]"
                  style={{ background: "rgba(255,255,255,0.5)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-r-full"
                    style={{ background: subject.progressColor }}
                  />
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* Floating icon */}
                    <motion.div
                      animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: subject.iconBg }}
                    >
                      <subject.icon className="w-6 h-6" style={{ color: subject.textColor }} />
                      <span className="absolute -top-1.5 -right-1.5 text-lg">{subject.illustration}</span>
                    </motion.div>

                    <div>
                      <h3 className="text-base font-bold leading-tight" style={{ color: subject.textColor, fontFamily: "var(--font-serif)" }}>
                        {subject.name}
                      </h3>
                      <p className="text-xs" style={{ color: "var(--color-text3)" }}>
                        {subject.topics} topics
                      </p>
                    </div>
                  </div>

                  {/* Circular accuracy ring */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none"
                        stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                      <motion.circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke={subject.progressColor} strokeWidth="2.5" strokeLinecap="round"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${accuracy ?? 0}, 100` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold" style={{ color: subject.textColor }}>
                        {accuracy !== null ? `${accuracy}%` : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-3 pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.5)" }}>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "var(--color-text3)" }}>Done</p>
                      <p className="text-base font-bold" style={{ color: subject.textColor }}>{done}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "var(--color-text3)" }}>Accuracy</p>
                      <p className="text-base font-bold" style={{ color: subject.textColor }}>
                        {accuracy !== null ? `${accuracy}%` : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Arrow button */}
                  <motion.div whileHover={{ x: 4 }}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br ${subject.gradient}`}>
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Hover sparkle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-20 pointer-events-none"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
