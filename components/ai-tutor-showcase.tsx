import { Feather, Sparkles, MessageCircle } from "lucide-react";

const TUTORS = [
  {
    icon: Feather,
    name: "Ollie the Owl",
    subject: "11+ Exam Prep",
    personality:
      "Patient and encouraging. Ollie breaks every tricky reasoning question into clear, calm steps.",
    quote: "Let's look at this one together. What do you notice first?",
    accent: true,
  },
  {
    icon: Sparkles,
    name: "Nova",
    subject: "GCSE Revision",
    personality:
      "Sharp and motivating. Nova drills exam technique and keeps revision focused on what scores marks.",
    quote: "Nice work. Now let's push for the top band. Show your method.",
    accent: false,
  },
];

export function AiTutorShowcase() {
  return (
    <section id="tutors" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Not a generic chatbot
        </div>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-text md:text-4xl">
          A trained AI tutor for every subject
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-text2">
          Each tutor has its own personality, voice and teaching style, tuned to
          the subject and the level it serves.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {TUTORS.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-2xl border border-border bg-card p-7"
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  t.accent ? "bg-accent text-accent-ink" : "bg-surface text-accent ring-1 ring-accent-line"
                }`}
              >
                <t.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-text">{t.name}</h3>
                <p className="text-sm font-medium text-accent">{t.subject}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-text2">
              {t.personality}
            </p>

            <div className="mt-5 rounded-xl border border-border bg-bg3/60 p-4">
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
