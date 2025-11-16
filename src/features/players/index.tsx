import { Search } from '../search/search-command'
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
    <div className="flex-1 flex flex-col gap-2">
      <Search />
      <div className="flex-1 flex flex-col overflow-auto">
        {players?.map((player) => (
          <div
            key={player.id}
            className="bg-gray-800 text-white p-3 mb-2 w-full box-border"
          >
            <h3 className="text-lg">
              {player.first_name} {player.last_name}
            </h3>
            <p>Overall Rating: {player.rating_current}</p>
            <p>Potential Rating: {player.rating_potential}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
