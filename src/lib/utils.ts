import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Player } from './types'
import { PlayerBaseExpand, PlayerStatsExpand } from '@/server/pocketbase-types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPlayer(
  playerBase: PlayerBaseExpand,
  playerStat: PlayerStatsExpand
) {
  const player: Player = {
    id: playerBase.id,
    first_name: playerBase.first_name,
    foot: playerBase.foot,
    kit_numbers: playerBase.kit_numbers,
    last_name: playerBase.last_name,
    market_value_base: playerBase.market_value,
    rating_base: playerBase.rating_overall,
    rating_potential: playerBase.rating_potential,
    wage_base: playerBase.wage,
    position: playerBase.position,
    country: playerBase?.expand?.country?.name,

    age: playerStat?.age,
    kit_number: playerStat?.kit_number,
    market_value_current: playerStat?.market_value,
    rating_current: playerStat?.rating,
    wage_current: playerStat?.wage,
    contract_length: playerStat?.contract_length,
    contract_role: playerStat?.role,
    release_clause: playerStat?.release_clause,
    team: playerStat?.expand?.team?.name,
    on_loan: playerStat?.expand?.on_loan?.name,
  }

  return player
}

export function formatPlayers(
  playerBases: PlayerBaseExpand[],
  playerStats: PlayerStatsExpand[]
) {
  const players: Player[] = playerBases.map((playerBase) => {
    const playerStat = playerStats.find(
      (stat) => stat?.expand?.player?.id === playerBase.id
    )

    return formatPlayer(playerBase, playerStat!)
  })

  return players
}
