import { useEffect, useState } from "react"

import { getHintCount } from "@/core/services/hunts/getHintCount"
import type { HuntParams } from "@/core/types/hunts"

export const useHintCountdown = (param?: HuntParams | null) => {
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!param?.huntId) {
      return
    }

    let interval: NodeJS.Timeout

    const fetchOnce = async () => {
      const result = await getHintCount({ huntId: param?.huntId })

      if (!result) {
        return
      }

      setCooldown(result.cooldown)
      setCount(result.count)

      if (result.cooldown > 0) {
        interval = setInterval(() => {
          setCooldown((prev) => {
            if (!prev || prev <= 1) {
              clearInterval(interval)

              return 0
            }

            return prev - 1
          })
        }, 1000)
      }
    }

    fetchOnce()

    return () => clearInterval(interval)
  }, [param])

  return { cooldown, count }
}
