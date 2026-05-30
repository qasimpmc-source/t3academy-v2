import { BookCheck, Bot, ClipboardCheck, LineChart, Users } from "lucide-react";

const PILLARS = [
  {
    icon: BookCheck,
    title: "Verified Question Banks",
    desc: "Every question reviewed and mapped to the real exam syllabus.",
  },
  {
    icon: Bot,
    title: "AI Subject Tutors",
    desc: "A dedicated tutor per subject — not one generic chatbot.",
  },
  {
    icon: ClipboardCheck,
    title: "Quizzes & Mock Exams",
    desc: "Timed, exam-style papers that mirror the real thing.",
  },
  {
    icon: LineChart,
    title: "Progress Reports",
    desc: "Accuracy, streaks and trophies updated after every session.",
  },
  {
    icon: Users,
    title: "Parents Dashboard",
    desc: "See exactly where your child shines and where to focus.",
  },
];

export function PlatformPillars() {
  return (
    <section id="pillars" className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <div className="mb-12 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-amber">
          One platform
        </div>
        <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-text md:text-4xl">
          Built around how children actually learn
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <div
            key={p.title}
            className={`group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
              i === 0 ? "lg:col-span-1" : ""
            }`}
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-bg text-amber transition-colors group-hover:bg-amber group-hover:text-bg2">
              <p.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mb-1.5 text-base font-bold text-text">{p.title}</h3>
            <p className="text-sm leading-relaxed text-text2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
