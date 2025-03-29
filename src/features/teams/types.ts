export type Team = {
  id: number
  name: string
  createdAt: string
  active: boolean
}

export type NewTeam = Omit<Team, 'id' | 'createdAt'>
