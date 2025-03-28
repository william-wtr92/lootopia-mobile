import { z } from "zod"

const appConfig = z
  .object({
    api: z.object({
      baseUrl: z.string(),
    }),
  })
  .strict()

export const config = appConfig.parse({
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  },
})
