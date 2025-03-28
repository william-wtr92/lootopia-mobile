import axios from "axios"

import { config } from "./config"
import { getSecuredValue, setSecuredValue } from "./secure"
import { securedKeys } from "./secure/keys"

export const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

apiClient.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers["set-cookie"]

    if (setCookieHeader) {
      const authToken = setCookieHeader[0].split(";")[0].split("=")[1]
      await setSecuredValue(securedKeys.auth, authToken)
    }

    return response
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.request.use(
  async (config) => {
    const authToken = await getSecuredValue(securedKeys.auth)

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
