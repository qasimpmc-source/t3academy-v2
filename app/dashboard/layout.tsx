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
    <div className="t3-emerald min-h-screen flex flex-col" style={{ background: "#faf6ec" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 h-14 px-6 flex items-center justify-between"
        style={{
          background: "rgba(250,246,236,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(6,95,70,0.12)",
          boxShadow: "0 1px 12px rgba(60,47,0,0.05)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: "rgba(6,120,87,0.1)", border: "1px solid rgba(6,95,70,0.2)" }}
          >
            🦉
          </span>
          <span className="text-lg font-bold tracking-tight" style={{ color: "#047857", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
            T3 <em className="not-italic" style={{ color: "#c9941a" }}>Academy</em>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Foundations", href: "/dashboard/foundations" },
            { label: "Mock Exam", href: "/dashboard/mock" },
            { label: "Progress", href: "/dashboard/progress" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline"
              style={{ color: "#5b554a", fontFamily: "'Montserrat', system-ui, sans-serif", letterSpacing: "0.04em" }}
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
              background: "rgba(6,120,87,0.08)",
              color: "#047857",
              border: "1px solid rgba(6,95,70,0.25)",
              fontFamily: "'Montserrat', system-ui, sans-serif",
            }}
          >
            {profile?.role === "student_gcse" ? "GCSE" : "11 Plus"}
          </span>
          <span className="text-xs font-medium" style={{ color: "#5b554a" }}>
            {profile?.full_name?.split(" ")[0] ?? "Student"}
          </span>
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
}
