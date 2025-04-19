import type { MfaLoginSchema } from "@/core/types/auth/mfa"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const mfa = async (data: MfaLoginSchema) => {
  const response = await client.post(routes.api.auth.mfa, data)

  return [response.status, response.key]
}
