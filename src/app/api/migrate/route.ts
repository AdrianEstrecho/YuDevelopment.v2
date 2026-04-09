import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAuthenticated } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity";

export const dynamic = "force-dynamic";

/**
 * One-time migration: push local site.json content to Sanity.
 * POST /api/migrate  (requires admin auth)
 */
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const filePath = path.join(process.cwd(), "src/content/site.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const content = JSON.parse(raw);

    await sanityClient.createOrReplace({
      _id: "siteContent",
      _type: "siteContent",
      ...content,
    });

    return NextResponse.json({ ok: true, message: "Content migrated to Sanity" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Migration failed" },
      { status: 500 }
    );
  }
}
