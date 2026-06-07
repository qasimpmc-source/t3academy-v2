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
    <div className="t3-emerald min-h-screen flex flex-col" style={{ background: "#022c22" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 h-14 px-6 flex items-center justify-between"
        style={{
          background: "rgba(2,44,34,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(149,211,186,0.12)",
          boxShadow: "inset 0 1px 0 0 rgba(149,211,186,0.08)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: "rgba(6,78,59,0.8)", border: "1px solid rgba(149,211,186,0.2)" }}
          >
            🦉
          </span>
          <span className="text-lg font-bold tracking-tight" style={{ color: "#95d3ba", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            T3 <em className="not-italic" style={{ color: "#e9c349" }}>Academy</em>
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
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline"
              style={{ color: "#bfc9c3", fontFamily: "'Montserrat', system-ui, sans-serif", letterSpacing: "0.04em" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:block text-xs px-2.5 py-1 rounded-full font-semibold"
            style={{
              background: "rgba(6,78,59,0.6)",
              color: "#95d3ba",
              border: "1px solid rgba(149,211,186,0.25)",
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            {profile?.role === "student_gcse" ? "GCSE" : "11 Plus"}
          </span>
          <span className="text-xs font-medium" style={{ color: "#bfc9c3" }}>
            {profile?.full_name?.split(" ")[0] ?? "Student"}
          </span>
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
}
