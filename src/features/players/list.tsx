import { Player } from '@/lib/types'
import { ListItem } from './list-item'

type ListProps = {
  players: Player[]
}

export const List = ({ players }: ListProps) => {
  return (
    <div className="flex-1 flex flex-col overflow-auto gap-2">
      {!players?.length ? (
        <div>No players found</div>
      ) : (
        players?.map((player) => <ListItem key={player.id} player={player} />)
      )}
    </div>
  )
}
