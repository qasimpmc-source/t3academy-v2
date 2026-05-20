"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  firstName: string;
}

export function WelcomeBanner({ firstName }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-[2rem] p-6 md:p-8"
      style={{
        background: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fff7ed 100%)",
        border: "2px solid rgba(251,191,36,0.4)",
        boxShadow: "0 8px 32px rgba(212,134,10,0.12)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2"
        style={{ background: "rgba(251,191,36,0.25)" }} />
      <div className="absolute bottom-0 left-1/4 w-24 h-24 rounded-full translate-y-1/2"
        style={{ background: "rgba(253,186,116,0.2)" }} />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Animated Ollie */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex-shrink-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: "linear-gradient(135deg, #d97706 0%, #92400e 100%)" }}>
              {/* Owl face */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Eyes */}
                <div className="absolute top-5 md:top-6 flex gap-2 md:gap-3">
                  {[0, 1].map(i => (
                    <div key={i} className="w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full relative" style={{ background: "#451a03" }}>
                        <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Beak */}
                <div className="absolute top-10 md:top-12 w-4 h-3 md:w-5 md:h-4 rounded-b-full"
                  style={{ background: "#f97316", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                {/* Ear tufts */}
                <div className="absolute -top-1 left-3 md:left-4 w-3 h-4 md:w-4 md:h-5 rounded-t-full rotate-[-20deg]"
                  style={{ background: "#b45309" }} />
                <div className="absolute -top-1 right-3 md:right-4 w-3 h-4 md:w-4 md:h-5 rounded-t-full rotate-[20deg]"
                  style={{ background: "#b45309" }} />
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 text-amber-400"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>

          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base font-semibold uppercase tracking-wide"
              style={{ color: "#d97706" }}
            >
              Good to see you, {firstName}!
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#451a03", fontFamily: "var(--font-serif)" }}
            >
              Ready for an adventure?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base"
              style={{ color: "rgba(120,53,15,0.8)" }}
            >
              Pick a subject below or ask Ollie where to focus today!
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/dashboard/english"
            className="flex items-center gap-2 no-underline font-bold text-lg px-8 py-4 rounded-full text-white group"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
              boxShadow: "0 8px 24px rgba(245,158,11,0.4)",
            }}
          >
            Let&apos;s Go!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
