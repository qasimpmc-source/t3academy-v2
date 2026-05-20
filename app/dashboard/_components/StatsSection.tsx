"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Flame, Zap, Star, Award } from "lucide-react";

interface Props {
  totalDone: number;
  accuracy: number | null;
  trophies: number;
  streak: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } },
};

export function StatsSection({ totalDone, accuracy, trophies, streak }: Props) {
  const stats = [
    {
      label: "Questions Done", value: String(totalDone), subtitle: "all topics",
      icon: Target, gradient: "from-blue-400 to-cyan-400",
      bg: "#eff6ff", iconBg: "#dbeafe", textColor: "#1d4ed8",
    },
    {
      label: "Accuracy", value: accuracy !== null ? `${accuracy}%` : "—", subtitle: "overall",
      icon: Zap, gradient: "from-emerald-400 to-teal-400",
      bg: "#f0fdf4", iconBg: "#dcfce7", textColor: "#15803d",
    },
    {
      label: "Trophies", value: String(trophies), subtitle: "earned",
      icon: Trophy, gradient: "from-amber-400 to-orange-400",
      bg: "#fffbeb", iconBg: "#fef3c7", textColor: "#d97706",
    },
    {
      label: "Streak", value: String(streak), subtitle: "days",
      icon: Flame, gradient: "from-rose-400 to-pink-400",
      bg: "#fff1f2", iconBg: "#ffe4e6", textColor: "#e11d48",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          whileHover={{
            scale: 1.03,
            rotate: index % 2 === 0 ? 1 : -1,
            transition: { type: "spring", stiffness: 300 },
          }}
          className="relative overflow-hidden rounded-3xl p-5 cursor-pointer group"
          style={{
            background: stat.bg,
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: "0 4px 16px rgba(28,24,18,0.08)",
          }}
        >
          {/* Background glow */}
          <div
            className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}
          />

          <div className="relative">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm"
              style={{ background: stat.iconBg }}>
              <stat.icon className="w-6 h-6" style={{ color: stat.textColor }} />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--color-text3)" }}>
              {stat.label}
            </p>

            <div className="flex items-baseline gap-1">
              <motion.span
                className="text-3xl font-bold"
                style={{ color: stat.textColor, fontFamily: "var(--font-serif)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm" style={{ color: "var(--color-text3)" }}>{stat.subtitle}</span>
            </div>
          </div>

          {stat.label === "Streak" && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-3 right-3"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </motion.div>
          )}
          {stat.label === "Trophies" && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-3 right-3"
            >
              <Award className="w-4 h-4 text-amber-500" />
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
