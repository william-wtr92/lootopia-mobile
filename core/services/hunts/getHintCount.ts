import type { HuntParams } from "@/core/types/hunts"
import type { HintCountResponse } from "@/core/types/hunts/hint"
import { client } from "@/core/utils/fetcher"
import { routes } from "@/core/utils/routes"

export const getHintCount = async (param: HuntParams) => {
  const response = await client.get<HintCountResponse>(
    routes.api.hunts.hintCount(param.huntId)
  )

  return typeof response.result === "string" ? null : response.result
}
