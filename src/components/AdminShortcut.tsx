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
      // Primary: Ctrl + Alt + .
      // Fallback: Ctrl + Shift + . (in case Ctrl+Alt maps to AltGr on Windows)
      const isCtrlAltDot = e.ctrlKey && e.altKey && (e.key === "." || e.code === "Period");
      const isCtrlShiftDot = e.ctrlKey && e.shiftKey && (e.key === "." || e.code === "Period" || e.key === ">");
      if (isCtrlAltDot || isCtrlShiftDot) {
        e.preventDefault();
        router.push("/studio");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
