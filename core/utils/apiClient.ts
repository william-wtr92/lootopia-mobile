import axios from "axios"
import { router } from "expo-router"

import { config } from "./config"
import { routes } from "./routes"
import { getSecuredValue, setSecuredValue } from "./secure"
import { securedKeys } from "./secure/keys"
import { SC } from "@/core/constants/status"
import { useAuthStore } from "@/core/store/useAuthStore"
import { useHuntStore } from "@/core/store/useHuntStore"

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
  async (error) => {
    if (error.response?.status === SC.errors.UNAUTHORIZED) {
      const { logout } = useAuthStore.getState()
      const { clearHuntId } = useHuntStore.getState()

      await logout()
      clearHuntId()

      router.replace(routes.app.login)
    }

    return Promise.reject(error)
  }
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
