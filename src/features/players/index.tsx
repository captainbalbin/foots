import { type Player } from '@/lib/types'
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
      {players?.map((player: Player) => {
        return (
          <div key={player.id}>
            <h3>
              {player.first_name} {player.last_name}
            </h3>
            <p>Overall Rating: {player.rating_current}</p>
            <p>Potential Rating: {player.rating_potential}</p>
          </div>
        )
      })}
    </div>
  )
}
