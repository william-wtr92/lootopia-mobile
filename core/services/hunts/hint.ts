import type { HuntParams } from "@/core/types/hunts"
import type { Position } from "@/core/types/hunts/dig"
import type { HintResponse } from "@/core/types/hunts/hint"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const hint = async (
  param: HuntParams,
  data: Position
): Promise<[number, string, HintResponse | null]> => {
  const response = await client.post<{
    minDistance: number
    maxDistance: number
  }>(routes.api.hunts.hint(param.huntId), data)

  const distance = typeof response.result === "string" ? null : response.result

  return [response.status, response.key, distance]
}
