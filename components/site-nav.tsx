import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg2/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber text-bg2">
            <GraduationCap className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-text">
            T3 Academy
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="#pillars"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text2 transition-colors hover:text-text"
          >
            Platform
          </Link>
          <Link
            href="#subjects"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text2 transition-colors hover:text-text"
          >
            Subjects
          </Link>
          <Link
            href="#tutors"
            className="rounded-lg px-3 py-2 text-sm font-medium text-text2 transition-colors hover:text-text"
          >
            AI Tutors
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/auth/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-text2 transition-colors hover:text-text"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-bg2 transition-colors hover:bg-amber2"
          >
            Start free
          </Link>
        </div>
      </div>
    </nav>
  );
}
