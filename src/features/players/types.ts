import { Player } from '@/lib/types'

export type NewPlayer = Omit<Player, 'id'>

export type UpdatePlayer = Partial<NewPlayer>
