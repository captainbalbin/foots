import { Player } from '../players/types'
import { useActiveTeam } from './useActiveTeam'
import { useTeamPlayers } from './useTeamPlayers'

export const TeamOverview = () => {
  const { activeTeam, activeTeamError, activeTeamLoading } = useActiveTeam()
  const { teamPlayers, teamPlayersError, teamPlayersLoading } = useTeamPlayers()

  if (activeTeamLoading) {
    return <div>Loading...</div>
  }

  if (teamPlayersLoading) {
    return <div>Loading team players...</div>
  }

  if (teamPlayersError) {
    return <div>Error: {teamPlayersError.message}</div>
  }

  if (activeTeamError) {
    return <div>Error: {activeTeamError.message}</div>
  }

  return (
    <div>
      <h1>Team Overview</h1>
      <p>Active team: {activeTeam?.name}</p>
      {teamPlayers?.map((player: Player) => {
        return (
          <div key={player.id}>
            <h2>
              {player.firstname} {player.lastname}
            </h2>
            <p>Overall rating: {player.overall_rating}</p>
            <p>Potential: {player.potential_rating}</p>
          </div>
        )
      })}
    </div>
  )
}
