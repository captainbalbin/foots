import PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

type Position = 'ST' | 'LW' | 'RW' | 'CM' | 'CDM' | 'CB' | 'LB' | 'RB' | 'GK'

export interface Player {
  id: string
  first_name: string
  last_name: string
  position: Position[]
  rating_overall: number
  rating_potential: number
  market_value: number
  wage: number
  foot: 'L' | 'R'
  kit_numbers: number[]
}

export interface PlayerExpand extends Player {
  expand: {
    country?: Country
  }
}

export interface PlayerStats {
  id: string
  date: string
  age: number
  rating: number
  team?: string
  market_value: number
  wage: number
  kit_number: number
  release_clause?: number
  contract_length?: number
}

export interface PlayerStatsExpand extends PlayerStats {
  expand: {
    team?: Team
    player?: Player
    on_loan?: Team
  }
}

export interface League {
  id: string
  name: string
  tier: number
}

export interface LeagueExpand extends League {
  expand: {
    country: Country
  }
}

export interface Team {
  id: string
  name: string
  active: boolean
}

export interface TeamExpand extends Team {
  expand: {
    players?: Player[]
    league?: League
    country?: Country
  }
}

export interface Country {
  id: string
  name: string
}

export interface CountryExpand extends Country {
  expand: {
    leagues?: League[]
    teams?: Team[]
    players?: Player[]
  }
}

export interface TypedPocketBase extends PocketBase {
  collection(idOrName: 'teams'): RecordService<TeamExpand[]>
  collection(idOrName: 'players'): RecordService<PlayerExpand[]>
  collection(idOrName: 'leagues'): RecordService<LeagueExpand[]>
  collection(idOrName: 'countries'): RecordService<CountryExpand[]>
  collection(idOrName: 'player_stats'): RecordService<PlayerStatsExpand[]>
}
