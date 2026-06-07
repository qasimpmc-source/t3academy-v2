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
    bg: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    accentBorder: "rgba(149,211,186,0.3)",
    iconBg: "rgba(149,211,186,0.15)",
    textColor: "#95d3ba",
    progressColor: "#95d3ba",
    ringBg: "rgba(149,211,186,0.1)",
    gradientBtn: "linear-gradient(135deg, #95d3ba 0%, #064e3b 100%)",
    btnColor: "#003829",
  },
  {
    id: "maths", name: "Maths", topics: 6, icon: Calculator, illustration: "🔢",
    bg: "linear-gradient(135deg, #0a3d2e 0%, #011a13 100%)",
    accentBorder: "rgba(149,211,186,0.2)",
    iconBg: "rgba(149,211,186,0.12)",
    textColor: "#b0f0d6",
    progressColor: "#b0f0d6",
    ringBg: "rgba(149,211,186,0.08)",
    gradientBtn: "linear-gradient(135deg, #b0f0d6 0%, #0a3d2e 100%)",
    btnColor: "#002117",
  },
  {
    id: "verbal", name: "Verbal Reasoning", topics: 7, icon: MessageCircle, illustration: "💬",
    bg: "linear-gradient(135deg, #3a2800 0%, #1e1600 100%)",
    accentBorder: "rgba(233,195,73,0.3)",
    iconBg: "rgba(233,195,73,0.15)",
    textColor: "#e9c349",
    progressColor: "#e9c349",
    ringBg: "rgba(233,195,73,0.1)",
    gradientBtn: "linear-gradient(135deg, #e9c349 0%, #3a2800 100%)",
    btnColor: "#1e1600",
  },
  {
    id: "nvr", name: "Non-Verbal Reasoning", topics: 7, icon: Shapes, illustration: "🧩",
    bg: "linear-gradient(135deg, #2d1e00 0%, #1a1200 100%)",
    accentBorder: "rgba(233,195,73,0.25)",
    iconBg: "rgba(233,195,73,0.12)",
    textColor: "#d4a017",
    progressColor: "#d4a017",
    ringBg: "rgba(233,195,73,0.08)",
    gradientBtn: "linear-gradient(135deg, #d4a017 0%, #2d1e00 100%)",
    btnColor: "#1a1200",
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
        <div className="w-8 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #95d3ba, #e9c349)" }} />
        <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#89938d", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
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
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                {/* Progress bar at top */}
                <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden rounded-t-2xl"
                  style={{ background: "rgba(255,255,255,0.05)" }}>
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
                      <p className="text-xs" style={{ color: "#89938d" }}>
                        {subject.topics} topics
                      </p>
                    </div>
                  </div>

                  {/* Accuracy ring */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none"
                        stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
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
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#89938d" }}>Done</p>
                      <p className="text-base font-bold" style={{ color: subject.textColor }}>{done}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: "#89938d" }}>Accuracy</p>
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
