export type Player = {
  id: number
  firstname: string
  lastname: string
  overall_rating: number
  potential_rating: number
  team: number | null
}

export type NewPlayer = Omit<Player, 'id'>
