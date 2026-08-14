import { axiosInstance } from "@/lib/redux/axios"

export interface LoginPayload {
  email: string
  password: string
}

export interface BackendTokenPair {
  accessToken: string
  refreshToken: string
}

export interface BackendUser {
  id: string
  name: string
  email: string
  personalId: string | null
  createdAt: string
  updatedAt: string
}

export interface UpdateProfilePayload {
  name?: string
  personalId?: string | null
}

// Calls the real Express backend: POST {API_BASE}/auth/login
export async function loginRequest(
  payload: LoginPayload
): Promise<BackendTokenPair> {
  const { data } = await axiosInstance.post<BackendTokenPair>(
    "auth/login",
    payload
  )
  return data
}

// Calls the real Express backend: GET {API_BASE}/auth/me
export async function fetchMe(): Promise<BackendUser> {
  const { data } = await axiosInstance.get<{ user: BackendUser }>("auth/me")
  return data.user
}

// Calls the real Express backend: PATCH {API_BASE}/auth/me
// Persists Profile Name / Personal ID changes to PostgreSQL for the
// currently authenticated user.
export async function updateProfileRequest(
  payload: UpdateProfilePayload
): Promise<BackendUser> {
  const { data } = await axiosInstance.patch<{ user: BackendUser }>(
    "auth/me",
    payload
  )
  return data.user
}
