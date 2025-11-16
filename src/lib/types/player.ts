export type Position =
  | 'ST'
  | 'LF'
  | 'CF'
  | 'RF'
  | 'LW'
  | 'LM'
  | 'RW'
  | 'RM'
  | 'CAM'
  | 'CM'
  | 'CDM'
  | 'LWB'
  | 'LB'
  | 'CB'
  | 'RWB'
  | 'RB'
  | 'GK'

export type Role =
  | 'Crucial'
  | 'Important'
  | 'Rotation'
  | 'Sporadic'
  | 'Future'
  | 'Prospect'

export type PlayerBase = {
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
  country?: {
    name?: string
    id?: string
  }
}

export type PlayerStats = {
  id: string
  date: string
  age: number
  rating: number
  team?: {
    name?: string
    id?: string
  }
  market_value: number
  wage: number
  kit_number: number
  release_clause?: number
  contract_length?: number
  role?: number
  on_loan?: {
    name?: string
    id?: string
  }
}

export type Player = Omit<
  PlayerBase,
  'wage' | 'rating_overall' | 'market_value'
> &
  Omit<
    PlayerStats,
    'id' | 'date' | 'wage' | 'rating' | 'market_value' | 'role'
  > & {
    wage_base: PlayerBase['wage']
    wage_current?: PlayerStats['wage']
    rating_base: PlayerBase['rating_overall']
    rating_current?: PlayerStats['rating']
    market_value_base: PlayerBase['market_value']
    market_value_current?: PlayerStats['market_value']
    contract_role?: PlayerStats['role']
  }
