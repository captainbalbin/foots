import { Player } from '@/server/pocketbase-types'

export type NewPlayer = Omit<Player, 'id'>

export type UpdatePlayer = Partial<NewPlayer>
