// app/api/waitlist/route.js
export const dynamic = "force-dynamic"; // always fetch fresh (no cache)

const UPSTREAM_BASE = process.env.ADMIN_API_BASE; // e.g. https://lang-learn-app-app-production.up.railway.app
const UPSTREAM_PATH = "/v1/api/waitlist";        // change if your backend path differs

function buildUpstreamUrl(reqUrl) {
  if (!UPSTREAM_BASE) {
    throw new Error("Missing ADMIN_API_BASE env var");
  }
  const inUrl = new URL(reqUrl);
  const outUrl = new URL(UPSTREAM_PATH, UPSTREAM_BASE);
  // forward all query params (size, page, q, source, etc.)
  inUrl.searchParams.forEach((v, k) => outUrl.searchParams.set(k, v));
  return outUrl.toString();
}

async function forward(method, req) {
  const target = buildUpstreamUrl(req.url);

  const res = await fetch(target, {
    method,
    // Forward JSON if client ever posts here (not needed for GET)
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  // Pass through the upstream response body & status
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}

export async function GET(req) {
  try {
    return await forward("GET", req);
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "error", message: e.message }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}

// Optional: support POST later if you add server-side filtering
export async function POST(req) {
  try {
    // If you need to forward body, uncomment below and adjust backend:
//  const body = await req.text();
//  const target = buildUpstreamUrl(req.url);
//  const res = await fetch(target, { method: "POST", body, headers: { "content-type": req.headers.get("content-type") || "application/json" }, cache: "no-store" });
//  const text = await res.text();
//  return new Response(text, { status: res.status, headers: { "content-type": res.headers.get("content-type") ?? "application/json" } });

    // For now, just mirror GET behavior to avoid 405 if someone POSTs here accidentally
    return await forward("GET", req);
  } catch (e) {
    return new Response(
      JSON.stringify({ status: "error", message: e.message }),
      { status: 502, headers: { "content-type": "application/json" } }
    );
  }
}
