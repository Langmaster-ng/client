// app/api/admin/login/route.js
export const dynamic = "force-dynamic";

const UPSTREAM_BASE = process.env.NEXT_PUBLIC_API_BASE;
const LOGIN_PATH = "/v1/api/admin/login";

async function forwardLogin(req) {
  if (!UPSTREAM_BASE) {
    return new Response(
      JSON.stringify({ status: "error", message: "Missing NEXT_PUBLIC_API_BASE env var" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.text();
    const target = new URL(LOGIN_PATH, UPSTREAM_BASE);
    const res = await fetch(target.toString(), {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ status: "error", message: err.message || "Proxy login error" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  return await forwardLogin(req);
}
