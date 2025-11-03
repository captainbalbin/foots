import { Team } from '@/server/pocketbase-types'

// export type Team = Tables<'teams'>

export type NewTeam = Omit<Team, 'id' | 'createdAt'>
