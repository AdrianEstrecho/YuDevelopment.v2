"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminShortcut() {
  const router = useRouter();

  useEffect(() => {
    // Don't attach inside iframes (the admin page embeds the site as a preview)
    if (typeof window !== "undefined" && window.self !== window.top) return;

    const handler = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === "." || e.code === "Period")) {
        e.preventDefault();
        // Always require fresh login: clear any existing auth cookie before navigating
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch {}
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
