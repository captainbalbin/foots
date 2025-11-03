import { Player as db_Player } from '@/server/pocketbase-types'

export type Player = Omit<db_Player, 'created' | 'updated' | 'expand'>

export type NewPlayer = Omit<Player, 'id'>

export type UpdatePlayer = Partial<NewPlayer>
