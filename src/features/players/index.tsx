import { Button } from '@/components/ui/button'
import { type NewPlayer } from './types'
import { type Player } from '@/server/pocketbase-types'
import { useCreatePlayer } from './useCreatePlayer'
import { usePlayers } from './usePlayers'
import { useDeletePlayer } from './useDeletePlayer'

export const Players = () => {
  const { players, playersError, playersLoading } = usePlayers()
  const { createPlayer } = useCreatePlayer()
  const { deletePlayer } = useDeletePlayer()

  if (playersLoading) {
    return <div>Loading...</div>
  }

  if (playersError) {
    return <div>playersError: {playersError.message}</div>
  }

  const handleCreatePlayer = () => {
    const newPlayer: NewPlayer = {
      first_name: 'John',
      last_name: 'Doe',
      kit_numbers: [10],
      position: ['ST'],
      rating_overall: 75,
      rating_potential: 80,
      market_value: 1000000,
      wage: 10000,
      foot: 'R',
    }

    createPlayer(newPlayer)
  }

  const handleDeletePlayer = (id: string) => {
    deletePlayer(id)
  }

  return (
    <div>
      <Button onClick={handleCreatePlayer}>Create Player</Button>
      {players?.map((player: Player) => {
        return (
          <div key={player.id}>
            <h3>
              {player.first_name} {player.last_name}
            </h3>
            <p>Overall Rating: {player.rating_overall}</p>
            <p>Potential Rating: {player.rating_potential}</p>
            {/* <p>Team: {player.team}</p> */}
            <Button onClick={() => handleDeletePlayer(player.id)}>
              Delete Player
            </Button>
          </div>
        )
      })}
    </div>
  )
}
