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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl px-5 py-4"
      style={{
        background: "linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fff7ed 100%)",
        border: "2px solid rgba(251,191,36,0.4)",
        boxShadow: "0 4px 20px rgba(212,134,10,0.1)",
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2"
        style={{ background: "rgba(251,191,36,0.2)" }} />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Animated Ollie */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #d97706 0%, #92400e 100%)" }}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-3 flex gap-1.5">
                  {[0, 1].map(i => (
                    <div key={i} className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full relative" style={{ background: "#451a03" }}>
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-6 w-2.5 h-2 rounded-b-full"
                  style={{ background: "#f97316", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                <div className="absolute -top-0.5 left-2 w-2 h-3 rounded-t-full rotate-[-20deg]" style={{ background: "#b45309" }} />
                <div className="absolute -top-0.5 right-2 w-2 h-3 rounded-t-full rotate-[20deg]" style={{ background: "#b45309" }} />
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
          </motion.div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#d97706" }}>
              Good to see you, {firstName}!
            </p>
            <h1 className="text-lg font-bold leading-tight" style={{ color: "#451a03", fontFamily: "var(--font-serif)" }}>
              Ready for an adventure?
            </h1>
            <p className="text-xs" style={{ color: "rgba(120,53,15,0.75)" }}>
              Pick a subject below or ask Ollie to guide you.
            </p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
          <Link
            href="/dashboard/english"
            className="flex items-center gap-1.5 no-underline font-bold text-sm px-5 py-2.5 rounded-full text-white group"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
              boxShadow: "0 4px 16px rgba(245,158,11,0.35)",
            }}
          >
            Let&apos;s Go!
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
