import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";
import { dataset, projectId } from "../env";

// Falls back to a project-config stub if the client failed to create.
// This keeps the builder importable in pages even when env vars are missing.
const builder = imageUrlBuilder(
  client ?? { projectId: projectId || "missing", dataset: dataset || "production" }
);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
