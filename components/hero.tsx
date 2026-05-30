import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BookCheck,
  Bot,
  ClipboardCheck,
  LineChart,
  Users,
} from "lucide-react";

const PILLARS = [
  { icon: BookCheck, label: "Verified Question Banks" },
  { icon: Bot, label: "Trained AI Tutors" },
  { icon: ClipboardCheck, label: "Quizzes & Mock Exams" },
  { icon: LineChart, label: "Progress Reports" },
  { icon: Users, label: "Parents Dashboard" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            A trained AI tutor for every subject
          </div>

          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl md:text-6xl">
            Test. Teach.{" "}
            <span className="text-accent">Test again.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-text2 md:text-lg">
            Your one stop solution for all exam preparation. Verified question
            banks, timed mock exams, and a trained AI tutor that teaches every
            topic, then tests it until it sticks.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#subjects"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-ink transition-colors hover:bg-accent2"
            >
              Explore platform
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-xl border border-border2 bg-surface px-7 py-3.5 text-base font-semibold text-text transition-colors hover:border-accent-line"
            >
              Start free
            </Link>
          </div>
        </div>

        {/* Platform pillars as uniform tabs */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
          {PILLARS.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-xl border border-border2 bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent-line"
            >
              <p.icon className="h-4 w-4 text-accent" aria-hidden="true" />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
