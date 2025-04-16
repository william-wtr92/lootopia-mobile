export type Position = {
  lat: string
  lng: string
}

export type Reward = {
  id: string
  description: string
  position: Position
  rewardType: "crown" | "artifact"
  reward: string | null
  size: number
  maxUsers: number
  visibility: boolean
  createdAt: string
  updatedAt: string
  artifactId: string | null
}
