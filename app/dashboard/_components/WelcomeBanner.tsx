"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
        background: "linear-gradient(135deg, #ffffff 0%, #fdf9ef 60%, #f3f9f4 100%)",
        border: "1px solid rgba(6,95,70,0.15)",
        boxShadow: "0 4px 20px rgba(60,47,0,0.07)",
      }}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"
        style={{ background: "rgba(201,148,26,0.12)", filter: "blur(20px)" }} />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Animated Ollie — emerald/gold */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #95d3ba 0%, #064e3b 100%)", border: "2px solid rgba(6,95,70,0.3)" }}>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-3 flex gap-1.5">
                  {[0, 1].map(i => (
                    <div key={i} className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full relative" style={{ background: "#022c22" }}>
                        <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-6 w-2.5 h-2 rounded-b-full"
                  style={{ background: "#e9c349", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
                <div className="absolute -top-0.5 left-2 w-2 h-3 rounded-t-full rotate-[-20deg]" style={{ background: "#064e3b" }} />
                <div className="absolute -top-0.5 right-2 w-2 h-3 rounded-t-full rotate-[20deg]" style={{ background: "#064e3b" }} />
              </div>
            </div>
          </motion.div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#a87810" }}>
              Good to see you, {firstName}!
            </p>
            <h1 className="text-lg font-bold leading-tight" style={{ color: "#065f46", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
              Ready for an adventure?
            </h1>
            <p className="text-xs" style={{ color: "#92897a" }}>
              Pick a subject below or ask Ollie to guide you.
            </p>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
          <Link
            href="/dashboard/english"
            className="flex items-center gap-1.5 no-underline font-bold text-sm px-5 py-2.5 rounded-full group"
            style={{
              background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
              color: "#ffffff",
              boxShadow: "0 4px 16px rgba(6,120,87,0.3)",
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
