import { z } from "zod"

const appConfig = z
  .object({
    blobUrl: z.string().url(),
    webviewUrl: z.string().url(),
    api: z.object({
      baseUrl: z.string(),
    }),
  })
  .strict()

export const config = appConfig.parse({
  blobUrl: process.env.EXPO_PUBLIC_BLOB_URL!,
  webviewUrl: process.env.EXPO_PUBLIC_WEBVIEW_URL!,
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL!,
  },
})
