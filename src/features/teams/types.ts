import { Tables } from '@/server/supabase'

export type Team = Tables<'teams'>

export type NewTeam = Omit<Team, 'id' | 'createdAt'>
