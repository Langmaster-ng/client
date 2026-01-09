import Cookies from "js-cookie";

export function setAdminCookie(token) {
  Cookies.set("lm_admin_token", token, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
}

export function getAdminToken() {
  return Cookies.get("lm_admin_token");
}

export function clearAdminToken() {
  Cookies.remove("lm_admin_token");
}

export function getNextParam(defaultPath = "/admin") {
  const url = new URL(window.location.href);
  return url.searchParams.get("next") || defaultPath;
}
