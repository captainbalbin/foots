import { Player } from '@/lib/types'
import { Link } from '@tanstack/react-router'

type ListItemProps = {
  player: Player
}

export const ListItem = ({ player }: ListItemProps) => {
  return (
    <Link to="/players/$playerId" params={{ playerId: player.id }}>
      <div
        key={player.id}
        className="bg-card p-3 w-full rounded-xl flex gap-2 items-center"
      >
        <div className="w-8 h-8 rounded-2xl bg-primary" />
        <div className="flex flex-col">
          <div id="name-and-rating" className="flex">
            <h2 className="font-semibold">
              {player.first_name} {player.last_name}
            </h2>
            <div id="rating-box" className="flex">
              <p>{player.rating_current}</p>
              <p>{player.rating_potential}</p>
            </div>
          </div>
          <div id="team-box" className="text-sm text-gray-400">
            {!player?.team?.id || !player?.team?.name ? (
              <span>No team</span>
            ) : (
              <Link to="/teams/$teamId" params={{ teamId: player.team.id }}>
                <span>{player.team?.name}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
