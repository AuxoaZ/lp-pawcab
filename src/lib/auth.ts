import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "pawcab_session";
const SESSION_SECRET = process.env.ADMIN_PASSWORD || "admin@123";

/**
 * Creates a deterministic HMAC-like token for the given timestamp
 */
export async function createSessionToken(timestamp: number): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`pawcab_admin_auth_${timestamp}_${SESSION_SECRET}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${timestamp}.${hashHex}`;
}

/**
 * Validates a session token string.
 * Valid for 7 days (7 * 86400 * 1000 ms).
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [tsStr] = parts;
  const timestamp = parseInt(tsStr, 10);
  if (isNaN(timestamp)) return false;

  // Max age: 7 days
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAge) return false;

  const expectedToken = await createSessionToken(timestamp);
  return token === expectedToken;
}

/**
 * Server-side helper to check if current request has a valid session cookie
 */
export async function checkServerSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    return await verifySessionToken(token);
  } catch {
    return false;
  }
}

