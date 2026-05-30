import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-text px-8 py-14 text-center md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber/20 blur-2xl"
        />
        <h2 className="relative text-balance font-serif text-3xl font-bold tracking-tight text-bg2 md:text-4xl">
          Test. Teach. Test again.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-bg3">
          Give your child a tutor that never tires of explaining. Start free
          today.
        </p>
        <Link
          href="/auth/signup"
          className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-amber px-7 py-3.5 text-base font-semibold text-bg2 transition-colors hover:bg-amber2"
        >
          Create your free account
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg2">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber text-bg2">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-bold tracking-tight text-text">
                T3 Academy
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text2">
              An online exam prep platform with a dedicated AI tutor for every
              subject.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Platform"
              links={[
                { label: "Question banks", href: "#pillars" },
                { label: "AI tutors", href: "#tutors" },
                { label: "Mock exams", href: "#pillars" },
              ]}
            />
            <FooterCol
              title="Subjects"
              links={[
                { label: "11+ Exam Prep", href: "#subjects" },
                { label: "GCSE Revision", href: "#subjects" },
                { label: "Coming soon", href: "#subjects" },
              ]}
            />
            <FooterCol
              title="Account"
              links={[
                { label: "Log in", href: "/auth/login" },
                { label: "Start free", href: "/auth/signup" },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text3">
            © {new Date().getFullYear()} T3 Academy. All rights reserved.
          </p>
          <p className="text-sm font-medium text-text2">
            Test. Teach. Test again.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-text3">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-text2 transition-colors hover:text-amber"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
