import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import { getHintCount } from "@/core/services/hunts/getHintCount"
import type { HuntParams } from "@/core/types/hunts"

export const useHintCountdown = (param?: HuntParams | null) => {
  const queryClient = useQueryClient()
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [count, setCount] = useState<number>(0)

  const { data, refetch } = useQuery({
    queryKey: ["hintCount", param?.huntId],
    queryFn: () => getHintCount({ huntId: param!.huntId }),
    enabled: !!param?.huntId,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  })

  useEffect(() => {
    if (!data) {
      return
    }

    setCooldown(data.cooldown)
    setCount(data.count)

    if (data.cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (!prev || prev <= 1) {
            clearInterval(interval)

            return 0
          }

          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [data])

  const refreshHintStatus = () => {
    queryClient.invalidateQueries({ queryKey: ["hintCount", param?.huntId] })
  }

  return { cooldown, count, refreshHintStatus, refetch }
}
