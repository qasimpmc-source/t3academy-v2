import { Feather, Sparkles, MessageCircle } from "lucide-react";

const TUTORS = [
  {
    icon: Feather,
    name: "Ollie the Owl",
    subject: "11+ Exam Prep",
    emoji: "🦉",
    personality:
      "Patient and encouraging. Ollie breaks every tricky reasoning question into clear, calm steps — coaching, not lecturing.",
    quote: "Let's look at this one together. What do you notice first?",
    glowClass: "glow-card",
  },
  {
    icon: Sparkles,
    name: "Nova",
    subject: "GCSE Revision",
    emoji: "✨",
    personality:
      "Sharp and motivating. Nova drills exam technique and keeps every session focused on what actually scores marks.",
    quote: "Nice work. Now let's push for the top band. Show your method.",
    glowClass: "glow-card glow-card--offset glow-card--slow",
  },
];

export function AiTutorShowcase() {
  return (
    <section id="tutors" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="mb-14 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Not a generic chatbot
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-text md:text-4xl">
          A trained AI tutor for every subject
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-text2">
          Each tutor has its own personality, voice, and teaching style — tuned
          to the subject and the level it serves.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {TUTORS.map((t) => (
          <div
            key={t.name}
            className={`${t.glowClass} relative flex flex-col rounded-2xl bg-card p-7`}
          >
            {/* Inner glow blob */}
            <div
              aria-hidden="true"
              className="pulse-glow pulse-glow--slow pointer-events-none absolute inset-x-0 top-0 mx-auto h-28 w-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(47,230,196,0.10) 0%, transparent 70%)",
              }}
            />

            <div className="relative flex items-center gap-4">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-bg text-3xl ring-1 ring-accent-line">
                {t.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold text-text">{t.name}</h3>
                <p className="text-sm font-medium text-accent">{t.subject}</p>
              </div>
            </div>

            <p className="relative mt-5 text-sm leading-relaxed text-text2">{t.personality}</p>

            {/* Quote block */}
            <div
              className="relative mt-5 rounded-xl p-4"
              style={{
                background: "var(--color-bg3)",
                border: "1px solid var(--color-border)",
                borderLeft: "3px solid var(--color-accent)",
              }}
            >
              <p className="text-sm italic leading-relaxed text-text">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
