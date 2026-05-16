import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !token) {
    return NextResponse.json({ error: "Sanity is not configured" }, { status: 500 });
  }
  return NextResponse.json({ projectId, dataset, token });
}
