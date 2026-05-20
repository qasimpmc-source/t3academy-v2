import Link from "next/link";

export default function MockExamPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-5">📋</div>
        <h1
          className="text-2xl font-semibold tracking-tight mb-3"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
        >
          Mock Exam — coming soon
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text2)" }}>
          Timed, full-length GL Assessment mock papers across all four subjects.
          We&apos;re building this now — it&apos;ll be ready before you need it.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl no-underline"
            style={{ background: "var(--color-amber)", color: "#fff" }}
          >
            Back to Dashboard
          </Link>
          <Link
            href="/dashboard/progress"
            className="text-sm font-semibold px-5 py-2.5 rounded-xl no-underline"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", color: "var(--color-text2)" }}
          >
            View Progress
          </Link>
        </div>
      </div>
    </div>
  );
}
