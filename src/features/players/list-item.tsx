import { Player } from '@/lib/types'

type ListItemProps = {
  player: Player
}

export const ListItem = ({ player }: ListItemProps) => {
  return (
    <div key={player.id} className="bg-accent p-3 w-full rounded">
      <h3 className="text-lg">
        {player.first_name} {player.last_name}
      </h3>
      <p>Overall Rating: {player.rating_current}</p>
      <p>Potential Rating: {player.rating_potential}</p>
    </div>
  )
}
