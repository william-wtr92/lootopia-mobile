export const defaultXP = 0
export const defaultLevel = 1

export const xpRequired = (level: number) => {
  const baseXP = 100
  const exponent = 1.5

  return Math.floor(baseXP * Math.pow(level, exponent))
}

export const nextLevelXP = (currentLevel: number | undefined) => {
  if (typeof currentLevel !== "number") {
    return defaultXP
  }

  return xpRequired(currentLevel + 1)
}

export const xpProgress = (
  currentXP: number,
  currentLevel: number | undefined
) => {
  if (typeof currentLevel !== "number") {
    return 0
  }

  return Math.min((currentXP / xpRequired(currentLevel + 1)) * 100, 100)
}
