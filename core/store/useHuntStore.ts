import { create } from "zustand"

type HuntState = {
  huntId: string | null
  huntName: string | null
  setHuntId: (id: string) => void
  setHuntName: (name: string) => void
  clearHuntId: () => void
}

export const useHuntStore = create<HuntState>((set) => ({
  huntId: null,
  huntName: null,
  setHuntId: (id) => set({ huntId: id }),
  setHuntName: (name) => set({ huntName: name }),
  clearHuntId: () => set({ huntId: null }),
}))
