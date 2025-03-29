import { Button } from '@/components/ui/button'
import { Player as PlayerType } from './types'
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
    const newPlayer = {
      firstname: 'John',
      lastname: 'Doe',
      overall_rating: 85,
      potential_rating: 90,
      team: null,
    }

    createPlayer(newPlayer)
  }

  const handleDeletePlayer = (id: number) => {
    deletePlayer(id)
  }

  return (
    <div>
      <Button onClick={handleCreatePlayer}>Create Player</Button>
      {players?.map((player: PlayerType) => {
        return (
          <div key={player.id}>
            <h3>
              {player.firstname} {player.lastname}
            </h3>
            <p>Overall Rating: {player.overall_rating}</p>
            <p>Potential Rating: {player.potential_rating}</p>
            <p>Team: {player.team}</p>
            <Button onClick={() => handleDeletePlayer(player.id)}>
              Delete Player
            </Button>
          </div>
        )
      })}
    </div>
  )
}
