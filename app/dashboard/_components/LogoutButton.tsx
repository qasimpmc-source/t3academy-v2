"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
      style={{
        background: "var(--color-bg3)",
        border: "1px solid var(--color-border)",
        color: "var(--color-text3)",
        cursor: "pointer",
      }}
    >
      Sign out
    </button>
  );
}
