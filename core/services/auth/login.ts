import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const login = async (data: { email: string; password: string }) => {
  const response = await client.post(routes.api.auth.login, data)

  return [response.status, response.key]
}
