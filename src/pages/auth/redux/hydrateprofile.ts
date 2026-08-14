import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "@/lib/redux/axios"

export const hydrateProfile = createAsyncThunk(
  "auth/hydrateProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/public/user-mod/account/profile"
      )

      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? "Unable to fetch profile.")
    }
  }
)
