import { cookies } from "next/headers";

// Deliberately not real auth: anyone who knows to visit /admin?admin=true can post.
export const ADMIN_COOKIE = "admin";

export async function isAdmin() {
  return (await cookies()).get(ADMIN_COOKIE)?.value === "true";
}
