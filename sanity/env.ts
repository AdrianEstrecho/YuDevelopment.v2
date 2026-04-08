// Sanity client configuration values, read from environment variables.
// All getters are defensive: if an env var is missing, blank, or malformed,
// we fall back to a sensible default so the build never crashes at module
// load time. The site will still render via the file-based fallback in
// src/lib/content.ts if Sanity is unreachable.

const FALLBACK_API_VERSION = "2024-10-01";

function sanitizeApiVersion(value: string | undefined): string {
  if (!value) return FALLBACK_API_VERSION;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, ""); // strip quotes/whitespace
  if (trimmed === "1" || /^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  // eslint-disable-next-line no-console
  console.warn(
    `[sanity] NEXT_PUBLIC_SANITY_API_VERSION="${value}" is invalid; falling back to ${FALLBACK_API_VERSION}`
  );
  return FALLBACK_API_VERSION;
}

function sanitizeString(value: string | undefined, fallback = ""): string {
  if (!value) return fallback;
  return value.trim().replace(/^['"]|['"]$/g, "");
}

export const apiVersion = sanitizeApiVersion(process.env.NEXT_PUBLIC_SANITY_API_VERSION);
export const dataset = sanitizeString(process.env.NEXT_PUBLIC_SANITY_DATASET, "production");
export const projectId = sanitizeString(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
