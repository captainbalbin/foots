import PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'
import type { Player, PlayerStats, League, Country, Team } from '@/lib/types'

export interface PlayerExpand extends Player {
  expand: {
    country?: Country
  }
}

export interface PlayerStatsExpand extends PlayerStats {
  expand: {
    team?: Team
    player?: Player
    on_loan?: Team
  }
}

export interface LeagueExpand extends League {
  expand: {
    country: Country
  }
}

export interface TeamExpand extends Team {
  expand: {
    players?: Player[]
    league?: League
    country?: Country
  }
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
