import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const { portfolio } = await getContent();
  const slugs = portfolio.projects.map((p) => ({
    name: p.name,
    slug: p.slug,
    hasSlug: !!p.slug,
  }));
  return NextResponse.json({ count: slugs.length, slugs });
}
