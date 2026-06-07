"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Flame, Zap } from "lucide-react";

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
      icon: Target,
      bg: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
      border: "rgba(149,211,186,0.25)",
      iconBg: "rgba(149,211,186,0.15)",
      iconColor: "#95d3ba",
      valueColor: "#95d3ba",
      glowColor: "rgba(149,211,186,0.12)",
    },
    {
      label: "Accuracy", value: accuracy !== null ? `${accuracy}%` : "—", subtitle: "overall",
      icon: Zap,
      bg: "linear-gradient(135deg, #0a3d2e 0%, #022c22 100%)",
      border: "rgba(149,211,186,0.2)",
      iconBg: "rgba(149,211,186,0.12)",
      iconColor: "#95d3ba",
      valueColor: "#b0f0d6",
      glowColor: "rgba(149,211,186,0.08)",
    },
    {
      label: "Trophies", value: String(trophies), subtitle: "earned",
      icon: Trophy,
      bg: "linear-gradient(135deg, #3a2800 0%, #1e1600 100%)",
      border: "rgba(233,195,73,0.3)",
      iconBg: "rgba(233,195,73,0.15)",
      iconColor: "#e9c349",
      valueColor: "#e9c349",
      glowColor: "rgba(233,195,73,0.1)",
    },
    {
      label: "Streak", value: String(streak), subtitle: "days",
      icon: Flame,
      bg: "linear-gradient(135deg, #2d1e00 0%, #1a1200 100%)",
      border: "rgba(233,195,73,0.25)",
      iconBg: "rgba(233,195,73,0.12)",
      iconColor: "#d4a017",
      valueColor: "#e9c349",
      glowColor: "rgba(233,195,73,0.08)",
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
          whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 300 } }}
          className="relative overflow-hidden rounded-2xl p-3 cursor-pointer group"
          style={{
            background: stat.bg,
            border: `1px solid ${stat.border}`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
          }}
        >
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: stat.glowColor, filter: "blur(16px)" }} />

          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: stat.iconBg }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.iconColor }} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#89938d" }}>
                {stat.label}
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <motion.span
                className="text-2xl font-bold"
                style={{ color: stat.valueColor, fontFamily: "'Montserrat', system-ui, sans-serif" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <span className="text-xs" style={{ color: "#89938d" }}>{stat.subtitle}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
