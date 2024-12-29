import type { Config } from "tailwindcss"

export default {
  presets: [require("nativewind/preset")],
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
