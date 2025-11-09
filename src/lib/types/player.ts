import { Team } from './team'

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

export type Player = {
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

export type PlayerStats = {
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
  role?: number
  on_loan?: Team
}
