import { createClient, type SanityClient } from "next-sanity";

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!_client) {
    const projectId = process.env.SANITY_PROJECT_ID;
    if (!projectId) {
      throw new Error("SANITY_PROJECT_ID environment variable is not set");
    }
    _client = createClient({
      projectId,
      dataset: process.env.SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    });
  }
  return _client;
}
