export const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API_BASE;


const BASE = ADMIN_API?.replace(/\/$/, "");

export async function adminPost(endpoint, body) {
  try {
    if (!BASE) throw new Error("Missing NEXT_PUBLIC_ADMIN_API_BASE");

    const url = `${BASE}/v1/api/admin${endpoint}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
}
