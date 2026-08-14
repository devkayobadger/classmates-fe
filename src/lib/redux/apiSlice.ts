import { createApi } from "@reduxjs/toolkit/query/react"

import { baseURL } from "@/lib/utils/tenant"
import { axiosInstance } from "./axios"

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async (args: any, api: any) => {
    const { url, method, data, params, headers } = args

    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })

      return {
        data: result.data,
      }
    } catch (axiosError: any) {
      if (axiosError?.isRefreshError) {
        api.dispatch(rootAPI.util.resetApiState())
      }

      return {
        error: {
          status: axiosError?.response?.status,
          data: axiosError?.response?.data || axiosError.message,
        },
      }
    }
  }

export const rootAPI = createApi({
  reducerPath: "rootAPI",

  baseQuery: axiosBaseQuery({
    baseUrl: baseURL,
  }),

  tagTypes: [
    "Dashboard",
    "Attendance",
    "Subject",
    "Student",
    "Assessment",
    "Report",
    "User",
    "Profile",
    "Notification",
  ],

  endpoints: () => ({}),
})
