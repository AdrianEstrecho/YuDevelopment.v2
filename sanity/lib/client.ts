import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Lazily create the client. If env vars are missing or invalid, we leave
// `client` as null and let the page fall back to file-based content.
let _client: SanityClient | null = null;

if (projectId) {
  try {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sanity] Failed to create client, falling back to file content:", err);
    _client = null;
  }
}

export const client = _client;
