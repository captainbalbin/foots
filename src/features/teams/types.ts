import { Team } from '@/server/pocketbase-types'

export type NewTeam = Omit<Team, 'id'>
