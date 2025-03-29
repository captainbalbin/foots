import { Player as PlayerType } from './types'
import { usePlayers } from './usePlayers'

export const Players = () => {
  const { players, playersError, playersLoading } = usePlayers()

  if (playersLoading) {
    return <div>Loading...</div>
  }
  if (playersError) {
    return <div>playersError: {playersError.message}</div>
  }

  return (
    <div>
      {players?.map((player: PlayerType) => {
        return (
          <div key={player.id}>
            <h3>
              {player.firstname} {player.lastname}
            </h3>
            <p>Overall Rating: {player.overall_rating}</p>
            <p>Potential Rating: {player.potential_raing}</p>
            <p>Team: {player.team}</p>
          </div>
        )
      })}
    </div>
  )
}
