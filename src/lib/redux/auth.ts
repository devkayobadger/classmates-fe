import Cookies from "js-cookie"

export const auth = {
  getAccess() {
    return Cookies.get("access")
  },

  getRefresh() {
    return Cookies.get("refresh")
  },

  setAccess(token: string) {
    Cookies.set("access", token, {
      secure: window.location.protocol === "https:",
      sameSite: "Lax",
      path: "/",
      expires: 1 / 48, // 30 minutes, matches backend JWT_ACCESS lifetime
    })
  },

  clear() {
    Cookies.remove("access")
    Cookies.remove("refresh")
  },
}
