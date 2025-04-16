import type { HuntParams } from "@/core/types/hunts"
import type { Position, Reward } from "@/core/types/hunts/dig"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const dig = async (
  param: HuntParams,
  data: Position
): Promise<[number, string, Reward | null]> => {
  const response = await client.post<Reward>(
    routes.api.hunts.dig(param.huntId),
    data
  )

  const reward = typeof response.result === "string" ? null : response.result

  return [response.status, response.key, reward]
}
