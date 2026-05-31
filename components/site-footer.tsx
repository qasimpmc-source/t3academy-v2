import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      {/* glow-card gives the animated spinning border; glow-card--slow makes it stately */}
      <div className="glow-card glow-card--slow relative overflow-hidden rounded-3xl bg-bg2 px-8 py-16 text-center md:py-24">
        {/* Animated radial glow blob — pulsing */}
        <div
          aria-hidden="true"
          className="pulse-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[32rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(47,230,196,0.18) 0%, transparent 65%)",
          }}
        />
        {/* Second softer blob offset upward */}
        <div
          aria-hidden="true"
          className="pulse-glow pulse-glow--slow pointer-events-none absolute left-1/2 -top-16 -translate-x-1/2 h-48 w-96 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(240,180,42,0.08) 0%, transparent 70%)",
          }}
        />

        <h2 className="relative font-display text-3xl font-bold tracking-tight text-text md:text-5xl">
          Test. Teach.{" "}
          <span
            className="text-accent"
            style={{ textShadow: "0 0 32px rgba(47,230,196,0.4)" }}
          >
            Test again.
          </span>
        </h2>
        <p className="relative mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-text2 md:text-lg">
          Your one stop solution for all exam preparation. Start free today — no
          credit card needed.
        </p>
        <Link
          href="/auth/signup"
          className="relative mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-ink transition-all hover:bg-accent2 hover:shadow-[0_0_32px_rgba(47,230,196,0.4)]"
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
    <footer className="border-t border-border bg-bg2/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-ink">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-text">
                T3 Academy
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text2">
              Your one stop solution for all exam preparation, with a trained AI
              tutor for every subject.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Platform"
              links={[
                { label: "Question banks", href: "#subjects" },
                { label: "AI tutors", href: "#tutors" },
                { label: "Mock exams", href: "#subjects" },
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
          <p className="text-sm font-medium text-text2">Test. Teach. Test again.</p>
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
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-text3">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-text2 transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
