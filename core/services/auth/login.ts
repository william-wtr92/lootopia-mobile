import type { LoginSchema } from "@/core/types/auth/login"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const login = async (data: LoginSchema) => {
  const response = await client.post(routes.api.auth.login, data)

  return [response.status, response.key]
}
