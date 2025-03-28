import { create } from "zustand"

import { getSecuredValue, deleteSecuredValue } from "@/core/utils/secure"
import { securedKeys } from "@/core/utils/secure/keys"

type AuthState = {
  isAuthenticated: boolean
  setAuth: (value: boolean) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuth: (value) => set({ isAuthenticated: value }),

  checkAuth: async () => {
    const token = await getSecuredValue(securedKeys.auth)
    set({ isAuthenticated: !!token })
  },

  logout: async () => {
    await deleteSecuredValue(securedKeys.auth)
    set({ isAuthenticated: false })
  },
}))
