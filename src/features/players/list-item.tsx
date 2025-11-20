import { Player } from '@/lib/types'
import { Link } from '@tanstack/react-router'
import { RatingCell } from '../table/cells'

type ListItemProps = {
  player: Player
}

export const ListItem = ({ player }: ListItemProps) => {
  return (
    <Link to="/players/$playerId" params={{ playerId: player.id }}>
      <div
        key={player.id}
        className="bg-card p-3 w-full rounded-xl flex gap-2 items-center hover:bg-sidebar-accent text-sm"
      >
        <div className="w-8 h-8 rounded-2xl bg-primary" />
        <div className="flex flex-col">
          <div id="name-and-rating" className="flex items-center gap-2">
            <h2 className="font-semibold">
              {player.first_name} {player.last_name}
            </h2>
            <div id="rating-box" className="flex gap-1">
              <RatingCell rating={player.rating_base} />
              <RatingCell rating={player.rating_potential} />
            </div>
          </div>
          <div id="team-box" className="text-xs text-gray-400">
            {!player?.team?.id || !player?.team?.name ? (
              <span>No team</span>
            ) : (
              <Link
                to="/teams/$teamId"
                params={{ teamId: player.team.id }}
                className="hover:text-accent-foreground"
              >
                <span>{player.team?.name}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
