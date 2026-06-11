"use client";

import { motion } from "framer-motion";
import { BookOpen, Calculator, MessageCircle, Shapes, ChevronRight } from "lucide-react";
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
    id: "english", name: "English", topics: 6, icon: BookOpen, illustration: "📚",
    bg: "linear-gradient(135deg, #ffffff 0%, #eef7f1 100%)",
    accentBorder: "rgba(6,95,70,0.2)",
    iconBg: "rgba(6,120,87,0.10)",
    textColor: "#065f46",
    progressColor: "#047857",
    ringBg: "rgba(6,120,87,0.1)",
    gradientBtn: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
    btnColor: "#ffffff",
  },
  {
    id: "maths", name: "Maths", topics: 6, icon: Calculator, illustration: "🔢",
    bg: "linear-gradient(135deg, #ffffff 0%, #e8f3ed 100%)",
    accentBorder: "rgba(6,95,70,0.16)",
    iconBg: "rgba(6,120,87,0.08)",
    textColor: "#047857",
    progressColor: "#059669",
    ringBg: "rgba(6,120,87,0.08)",
    gradientBtn: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    btnColor: "#ffffff",
  },
  {
    id: "verbal", name: "Verbal Reasoning", topics: 7, icon: MessageCircle, illustration: "💬",
    bg: "linear-gradient(135deg, #ffffff 0%, #fdf6e0 100%)",
    accentBorder: "rgba(201,148,26,0.3)",
    iconBg: "rgba(201,148,26,0.12)",
    textColor: "#a87810",
    progressColor: "#c9941a",
    ringBg: "rgba(201,148,26,0.1)",
    gradientBtn: "linear-gradient(135deg, #c9941a 0%, #a87810 100%)",
    btnColor: "#ffffff",
  },
  {
    id: "nvr", name: "Non-Verbal Reasoning", topics: 7, icon: Shapes, illustration: "🧩",
    bg: "linear-gradient(135deg, #ffffff 0%, #fbf1d3 100%)",
    accentBorder: "rgba(201,148,26,0.25)",
    iconBg: "rgba(201,148,26,0.10)",
    textColor: "#8a6210",
    progressColor: "#a87810",
    ringBg: "rgba(201,148,26,0.08)",
    gradientBtn: "linear-gradient(135deg, #a87810 0%, #8a6210 100%)",
    btnColor: "#ffffff",
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
        <div className="w-8 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #047857, #c9941a)" }} />
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#92897a", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
          Choose Your Subject
        </h2>
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
                  border: `1px solid ${subject.accentBorder}`,
                  boxShadow: "0 4px 18px rgba(60,47,0,0.07)",
                }}
              >
                {/* Progress bar at top */}
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-2xl"
                  style={{ background: "rgba(6,95,70,0.08)" }}>
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
                    <motion.div
                      animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: subject.iconBg, border: `1px solid ${subject.accentBorder}` }}
                    >
                      <subject.icon className="w-6 h-6" style={{ color: subject.textColor }} />
                      <span className="absolute -top-1.5 -right-1.5 text-lg">{subject.illustration}</span>
                    </motion.div>

                    <div>
                      <h3 className="text-base font-bold leading-tight" style={{ color: subject.textColor, fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                        {subject.name}
                      </h3>
                      <p className="text-xs" style={{ color: "#92897a" }}>
                        {subject.topics} topics
                      </p>
                    </div>
                  </div>

                  {/* Accuracy ring */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none"
                        stroke="rgba(6,95,70,0.12)" strokeWidth="2" />
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
                  style={{ borderTop: "1px solid rgba(6,95,70,0.08)" }}>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#92897a" }}>Done</p>
                      <p className="text-base font-bold" style={{ color: subject.textColor }}>{done}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#92897a" }}>Accuracy</p>
                      <p className="text-base font-bold" style={{ color: subject.textColor }}>
                        {accuracy !== null ? `${accuracy}%` : "—"}
                      </p>
                    </div>
                  </div>

                  <motion.div whileHover={{ x: 4 }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: subject.gradientBtn }}>
                      <ChevronRight className="w-6 h-6" style={{ color: subject.btnColor }} />
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
