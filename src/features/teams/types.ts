import { Team } from '@/lib/types'

export type NewTeam = Omit<Team, 'id'>
