import PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export interface Player {
  id: string
  first_name: string
  last_name: string
  position: string
  kit_number: number
  team: string
  created: string
  updated: string
  expand?: {
    team: Team
  }
}

export interface League {
  id: string
  name: string
  country: string
  tier: number
  created: string
  updated: string
}

export interface Team {
  id: string
  name: string
  league: string
  active: boolean
  created: string
  updated: string
  expand?: {
    players: Player[]
    league: League
  }
}

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: string): RecordService // default fallback for any other collection
  collection(idOrName: 'teams'): RecordService<Team>
}
