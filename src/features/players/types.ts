import { Tables } from '@/server/supabase'

export type Player = Tables<'players'>

export type NewPlayer = Omit<Player, 'id'>
