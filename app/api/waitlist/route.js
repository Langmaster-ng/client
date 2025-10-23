export const dynamic = "force-dynamic";

const UPSTREAM_BASE = process.env.NEXT_PUBLIC_API_BASE;
const UPSTREAM_PATH = "/v1/api/waitlist";

function buildUpstreamUrl(reqUrl) {
  if (!UPSTREAM_BASE) throw new Error("Missing NEXT_PUBLIC_API_BASE env var");
  const inUrl = new URL(reqUrl);
  const outUrl = new URL(UPSTREAM_PATH, UPSTREAM_BASE);
  inUrl.searchParams.forEach((v, k) => outUrl.searchParams.set(k, v));
  return outUrl.toString();
}

export async function GET(req) {
  try {
    const target = buildUpstreamUrl(req.url);
    const res = await fetch(target, { cache: "no-store" });
    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ status: "error", message: e.message }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}
