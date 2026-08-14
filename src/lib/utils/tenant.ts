// export const getTenant = (): string | null => {
//   if (typeof window === "undefined") return null

//   const hostname = window.location.hostname
//   const parts = hostname.split(".")

//   if (hostname.includes("localhost")) {
//     return parts.length > 1 ? parts[0] : null
//   }
//   return parts.length > 2 ? parts[0] : null
// }

// export const getApiUrl = (): string => {
//   const tenant = getTenant()

//   // Extract all env variables
//   const scheme = import.meta.env.VITE_PUBLIC_APP_HTTP_SCHEME
//   const defaultBaseUrl = import.meta.env.VITE_PUBLIC_APP_BASE_URL
//   const apiVersion = import.meta.env.VITE_PUBLIC_APP_API_VERSION

//   const targetBaseUrl = tenant ? `${tenant}.${defaultBaseUrl}` : defaultBaseUrl

//   // final api url
//   return `${scheme}${targetBaseUrl}/${apiVersion}/`
// }

// export const baseURL = getApiUrl()

export const getApiUrl = (): string => {
  const scheme = import.meta.env.VITE_PUBLIC_APP_HTTP_SCHEME
  const baseUrl = import.meta.env.VITE_PUBLIC_APP_BASE_URL
  const apiVersion = import.meta.env.VITE_PUBLIC_APP_API_VERSION

  return `${scheme}${baseUrl}/${apiVersion}/`
}

export const baseURL = getApiUrl()
