/**
 * This route mounts Sanity Studio at /studio.
 * Configuration lives in `sanity.config.ts` at the project root.
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
