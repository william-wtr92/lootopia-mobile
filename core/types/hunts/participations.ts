export const huntParticipationStatus = {
  started: "started",
  upcoming: "upcoming",
} as const

export type HuntParticipationStatus =
  (typeof huntParticipationStatus)[keyof typeof huntParticipationStatus]

export type Hunt = {
  id: string
  name: string
  description: string
  city: string
  startDate: string
  endDate: string
  public: boolean
  maxParticipants: number
  active: boolean
  createdAt: string
  updatedAt: string
  organizerId: string
}

export type HuntParticipation = {
  id: string
  userId: string
  huntId: string
  joinedAt: string
}

export type HuntParticipationResult = {
  hunts: Hunt
  hunt_participations: HuntParticipation
}

export type HuntParticipationListResponse = {
  result: HuntParticipationResult[]
  lastPage: number
}
