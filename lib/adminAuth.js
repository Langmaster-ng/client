export function setAdminCookie(token, days = 7) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `lm_admin=${token};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
export function clearAdminCookie() {
  if (typeof document === "undefined") return;
  document.cookie = "lm_admin=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax";
}
export function getNextParam(defaultPath = "/admin") {
  if (typeof window === "undefined") return defaultPath;
  const url = new URL(window.location.href);
  return url.searchParams.get("next") || defaultPath;
}
