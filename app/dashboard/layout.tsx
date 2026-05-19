import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./_components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user!.id)
    .single();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 h-14 px-6 flex items-center justify-between"
        style={{
          background: "rgba(248,246,242,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Logo — links to home */}
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{
              background: "var(--color-amber-bg)",
              border: "1px solid rgba(212,134,10,0.15)",
            }}
          >
            🦉
          </span>
          <span
            className="text-lg font-medium tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            T3 <em className="not-italic" style={{ color: "var(--color-amber)" }}>Academy</em>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mock Exam", href: "/dashboard/mock" },
            { label: "Progress", href: "/dashboard/progress" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors no-underline"
              style={{ color: "var(--color-text3)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:block text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: "var(--color-amber-bg)",
              color: "var(--color-amber)",
              border: "1px solid rgba(212,134,10,0.2)",
            }}
          >
            {profile?.role === "student_gcse" ? "GCSE" : "11 Plus"}
          </span>
          <span className="text-xs font-medium" style={{ color: "var(--color-text2)" }}>
            {profile?.full_name?.split(" ")[0] ?? "Student"}
          </span>
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
}
