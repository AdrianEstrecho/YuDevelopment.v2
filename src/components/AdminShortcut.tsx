"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Global keyboard shortcut: Ctrl + Alt + . navigates to Sanity Studio.
 * Skipped inside iframes (so the Studio's embedded preview doesn't trigger it).
 */
export default function AdminShortcut() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.self !== window.top) return;

    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && (e.key === "." || e.code === "Period")) {
        e.preventDefault();
        router.push("/studio");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
