import type { HuntParticipationSchema } from "@/core/types/global/pagination"

export const routes = {
  app: {
    hunts: "/list",
    map: "/",
    login: "/login",
    users: {
      profile: "/profile",
    },
  },
  api: {
    auth: {
      login: "/auth/login",
      mfa: "/auth/login/mfa",
    },
    users: {
      me: "/users/me",
    },
    hunts: {
      dig: (huntId: string) => `/hunts/${huntId}/dig`,
      hint: (huntId: string) => `/hunts/${huntId}/hint`,
      hintCount: (huntId: string) => `/hunts/${huntId}/hint`,
      participations: ({
        page,
        limit,
        search,
        status,
      }: HuntParticipationSchema) =>
        `/hunts/participations?page=${page}&limit=${limit}&search=${search}&status=${status}`,
    },
  },
  webview: {
    artifactsViewer: (artifactId: string) => `/artifacts/${artifactId}`,
  },
} as const
