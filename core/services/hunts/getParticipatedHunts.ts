import {
  defaultLimit,
  type HuntParticipationSchema,
} from "@/core/types/global/pagination"
import type { HuntParticipationListResponse } from "@/core/types/hunts/participations"
import { apiClient } from "@/core/utils/apiClient"
import { routes } from "@/core/utils/routes"

export const getParticipatedHunts = async ({
  page,
  limit = defaultLimit,
  search,
  status,
}: HuntParticipationSchema) => {
  const response = await apiClient.get<HuntParticipationListResponse>(
    routes.api.hunts.participations({
      page,
      limit,
      search: search || "",
      status,
    })
  )

  return response.data
}
