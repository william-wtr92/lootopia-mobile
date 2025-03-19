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
    },
    users: {
      me: "/users/me",
    },
  },
} as const
