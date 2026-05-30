import Link from "next/link";
import { ArrowRight, Sparkles, RotateCcw, BookOpen, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft geometric accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-bg blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-64 w-64 rounded-full bg-bg3 blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber/25 bg-amber-bg px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            An AI tutor for every subject
          </div>

          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl">
            Test. Teach.{" "}
            <span className="relative whitespace-nowrap text-amber">
              Test again.
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-amber/40"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 C 50 2, 150 2, 198 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text2">
            The exam prep platform where a dedicated AI tutor — trained for each
            subject — guides your child through every topic, then tests it until
            it sticks.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#subjects"
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3.5 text-base font-semibold text-bg2 transition-colors hover:bg-amber2"
            >
              Explore platform
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-xl border border-border2 bg-bg2 px-7 py-3.5 text-base font-semibold text-text transition-colors hover:bg-bg3"
            >
              Start free
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text3">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber" aria-hidden="true" />
              No credit card needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-amber" aria-hidden="true" />
              Verified question banks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-amber" aria-hidden="true" />
              Endless practice
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
