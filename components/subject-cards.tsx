import Link from "next/link";
import {
  GraduationCap,
  Calculator,
  Lightbulb,
  Brain,
  Target,
  Smile,
  ArrowRight,
  Lock,
  type LucideIcon,
} from "lucide-react";

type Subject = {
  icon: LucideIcon;
  name: string;
  teaser: string;
  status: "live" | "soon";
  href?: string;
};

const SUBJECTS: Subject[] = [
  {
    icon: GraduationCap,
    name: "11+ Exam Prep",
    teaser: "English, Maths, Verbal & Non-Verbal Reasoning with Ollie the Owl.",
    status: "live",
    href: "/auth/signup",
  },
  {
    icon: Calculator,
    name: "GCSE Revision",
    teaser: "Core subjects, exam technique and past-paper drills with Nova.",
    status: "live",
    href: "/auth/signup",
  },
  {
    icon: Lightbulb,
    name: "General Knowledge for Kids",
    teaser: "Curious facts and quizzes that make learning feel like play.",
    status: "soon",
  },
  {
    icon: Brain,
    name: "Quick IQ Test",
    teaser: "Bite-sized reasoning challenges with instant scoring.",
    status: "soon",
  },
  {
    icon: Target,
    name: "Aptitude Test",
    teaser: "Discover natural strengths across logic, numbers and words.",
    status: "soon",
  },
  {
    icon: Smile,
    name: "Personality Test",
    teaser: "A friendly profile of how your child learns best.",
    status: "soon",
  },
];

function LiveCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <Link
      href={subject.href ?? "#"}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-md"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-bg text-amber transition-colors group-hover:bg-amber group-hover:text-bg2">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-bg2">
          <span className="h-1.5 w-1.5 rounded-full bg-bg2" aria-hidden="true" />
          Live
        </span>
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-text">{subject.name}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-text2">
        {subject.teaser}
      </p>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber">
        Start learning
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

function SoonCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-dashed border-border2 bg-bg2 p-6">
      <div className="mb-5 flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-bg3 text-text3">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border2 bg-bg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-text3">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Soon
        </span>
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-text">{subject.name}</h3>
      <p className="text-sm leading-relaxed text-text2">{subject.teaser}</p>
    </div>
  );
}

export function SubjectCards() {
  return (
    <section id="subjects" className="border-y border-border bg-bg3/40 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-amber">
            Subjects
          </div>
          <h2 className="text-balance font-serif text-3xl font-bold tracking-tight text-text md:text-4xl">
            Live now, with much more on the way
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-text2">
            Start with our flagship exam-prep courses today. New subjects are
            being crafted with the same care.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) =>
            s.status === "live" ? (
              <LiveCard key={s.name} subject={s} />
            ) : (
              <SoonCard key={s.name} subject={s} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
