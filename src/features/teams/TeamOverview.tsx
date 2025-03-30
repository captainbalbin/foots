import { Player } from '@/features/players/types'
import { DataTable } from '@/features/table/data-table'
import { columns } from '@/features/table/columns'
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
      <DataTable columns={columns} data={teamPlayers ?? []} />
      {/* {teamPlayers?.map((player: Player) => {
        return (
          <div key={player.id}>
            <h2>
              {player.first_name} {player.last_name}
            </h2>
            <p>Overall rating: {player.overall_rating}</p>
            <p>Potential: {player.potential_rating}</p>
            <p>Position: {player.position}</p>
            <p>Age: {player.age}</p>
            <p>Contract length: {player.contract_length}</p>
            <p>Contract role: {player.contract_role}</p>
            <p>Salary: {player.salary}</p>
            <p>Base rating: {player.base_rating}</p>
            <p>Current rating: {player.current_rating}</p>
            <p>Base market value: {player.base_market_value}</p>
            <p>Current market value: {player.current_market_value}</p>
            <p>Release clause: {player.release_clause ?? 'None'}</p>
            <p>Loaned in: {player.loaned_in ? 'Yes' : 'No'}</p>
            <p>Loaned out: {player.loaned_out ? 'Yes' : 'No'}</p>
            <p>Team: {player.team}</p>
          </div>
        )
      })} */}
    </div>
  )
}
