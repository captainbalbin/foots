export type Team = {
  id: string
  name: string
  createdAt: string
  active: boolean
}

export type NewTeam = Omit<Team, 'id' | 'createdAt'>
