import type { UserSchema } from "@/core/types/users"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const getUserLoggedIn = async () => {
  const response = await client.get<UserSchema>(routes.api.users.me)

  return response.result
}
