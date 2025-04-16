import type { Config } from "tailwindcss"

export default {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./core/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A0E4E",
        secondary: "#8A4FFF",
        accent: "#FFD700",
        accentHover: "#E6C200",
        primaryBg: "#F8F0E3",
        secondaryBg: "#E6D9C0",
        error: "#FF0000",
        success: "#22C55E",
      },
    },
  },
  plugins: [],
} satisfies Config
