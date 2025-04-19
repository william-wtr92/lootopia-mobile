import type { LoginResponse, LoginSchema } from "@/core/types/auth/login"
import { apiClient } from "@/core/utils/apiClient"
import { routes } from "@/core/utils/routes"

export const login = async (
  data: LoginSchema
): Promise<
  [number, string | Pick<LoginResponse, "mfaRequired" | "sessionId" | "key">]
> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      routes.api.auth.login,
      data
    )

    const { status } = response
    const { mfaRequired, sessionId, key } = response.data

    if (mfaRequired && sessionId) {
      return [status, { mfaRequired, sessionId, key }]
    }

    return [status, key]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.response?.status
    const key = error.response?.data?.key

    return [status, key]
  }
}
