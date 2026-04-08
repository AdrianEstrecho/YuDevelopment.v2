import { cookies } from "next/headers";

export const AUTH_COOKIE = "ygccc_admin_auth";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin";
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "1";
}
