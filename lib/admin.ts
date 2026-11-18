import { headers } from "next/headers";

/**
 * An admin is anyone visiting from one of the addresses in the ADMIN_IPS environment variable
 * (set in Vercel → Settings → Environment Variables). Comma-separated; each entry is an exact address
 * ("203.0.113.7", "2600:1700:abcd::1") or a range ("203.0.113.0/24", "2600:1700:abcd:1234::/64").
 * Home connections often get a new address now and then — if /admin stops working, check the address
 * it shows and update the variable.
 *
 * In local development (`pnpm dev`) the computer itself always counts as an admin.
 */
export async function clientIp(): Promise<string | null> {
  const h = await headers();
  // On Vercel these are set by the platform, not the visitor, so they can't be faked.
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0];
  return ip?.trim() || null;
}

export function adminIpsConfigured() {
  return allowList().length > 0;
}

export async function isAdmin() {
  const ip = await clientIp();
  if (process.env.NODE_ENV === "development" && (!ip || isLoopback(ip))) return true;
  if (!ip) return false;
  return allowList().some((entry) => matches(ip, entry));
}

function allowList() {
  return (process.env.ADMIN_IPS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isLoopback(ip: string) {
  return ip === "::1" || ip.startsWith("127.") || ip === "::ffff:127.0.0.1";
}

function matches(ip: string, entry: string) {
  const [base, bitsText] = entry.split("/");
  const a = toBytes(ip);
  const b = toBytes(base);
  if (!a || !b || a.length !== b.length) return false;
  const bits = bitsText === undefined ? a.length * 8 : Number(bitsText);
  if (!Number.isInteger(bits) || bits < 0 || bits > a.length * 8) return false;
  for (let i = 0; i < bits; i++) {
    const mask = 0x80 >> i % 8;
    if ((a[i >> 3] & mask) !== (b[i >> 3] & mask)) return false;
  }
  return true;
}

/** An IPv4 address as 4 bytes, IPv6 as 16. IPv4-mapped IPv6 ("::ffff:1.2.3.4") becomes IPv4. */
function toBytes(ip: string): number[] | null {
  ip = ip.trim().toLowerCase().replace(/%.*$/, "");
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) ip = mapped[1];

  if (/^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
    const parts = ip.split(".").map(Number);
    return parts.every((n) => n >= 0 && n <= 255) ? parts : null;
  }
  if (!ip.includes(":")) return null;

  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  const bytes: number[] = [];
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(g)) return null;
    const n = parseInt(g, 16);
    bytes.push(n >> 8, n & 0xff);
  }
  return bytes;
}
