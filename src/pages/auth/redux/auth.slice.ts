import Cookies from "js-cookie"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { IAuthState } from "./auth.types"
import { hydrateProfile } from "./hydrateprofile"

const initialState: IAuthState = {
  tokens: null,
  isAuthenticated: false,
  isSuperUser: false,
  profile: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<IAuthState & { keepSignedIn?: boolean }>
    ) => {
      const { tokens, isSuperUser, profile, keepSignedIn } = action.payload
      state.tokens = tokens
      state.isAuthenticated = true
      state.isSuperUser = isSuperUser ?? state.isSuperUser
      if (profile !== undefined) {
        state.profile = profile
      }

      const isSecureContext = window.location.protocol === "https:"

      Cookies.set("access", tokens?.access as string, {
        path: "/",
        secure: isSecureContext,
        sameSite: "Lax",
        expires: 1 / 48, // 30 minutes, matches backend JWT_ACCESS lifetime
      })
      Cookies.set("refresh", tokens?.refresh as string, {
        path: "/",
        secure: isSecureContext,
        sameSite: "Lax",
        // "Keep me signed in" checked -> persists 7 days (matches backend
        // JWT_REFRESH lifetime), even across browser restarts.
        // Unchecked -> plain session cookie, cleared when the browser closes.
        ...(keepSignedIn ? { expires: 7 } : {}),
      })
    },

    logoutSuccess: (state) => {
      Cookies.remove("access", { path: "/" })
      Cookies.remove("refresh", { path: "/" })

      state.tokens = null
      state.isAuthenticated = false
      state.profile = null
    },

    refreshTokenSuccess: (state, action: PayloadAction<{ access: string }>) => {
      const { access } = action.payload
      if (state.tokens) {
        state.tokens.access = access
      }

      Cookies.set("access", access, {
        path: "/",
        secure: window.location.protocol === "https:",
        sameSite: "Lax",
        expires: 1 / 48, // 30 minutes, matches backend JWT_ACCESS lifetime
      })
    },

    setProfile: (state, action: PayloadAction<IAuthState["profile"]>) => {
      state.profile = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateProfile.fulfilled, (state, action) => {
      state.profile = action.payload
    })
  },
})

export const { loginSuccess, logoutSuccess, refreshTokenSuccess, setProfile } =
  authSlice.actions
export default authSlice.reducer
