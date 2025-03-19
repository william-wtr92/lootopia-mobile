import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export type User = {
  birthdate: string
  email: string
  nickname: string
  phone: string
}

export const getUserLoggedIn = async () => {
  const response = await client.get<User>(routes.api.users.me)

  return response.result
}
