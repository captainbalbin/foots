import { DataTable } from '@/features/table/data-table'
import { columns } from '@/features/table/columns'
import { useActiveTeam } from './useActiveTeam'
import { useTeamPlayers } from './useTeamPlayers'
import { DateSelector } from '../dates/date-selector'

export const TeamOverview = () => {
  const { activeTeam, activeTeamError, activeTeamLoading } = useActiveTeam()
  const { teamPlayers, teamPlayersError, teamPlayersLoading } = useTeamPlayers()

  if (activeTeamLoading) {
    return <div>Loading...</div>
  }

  if (teamPlayersLoading) {
    return <div>Loading team players...</div>
  }

  if (teamPlayersError || !teamPlayers?.length) {
    return <div>Error: {teamPlayersError?.message}</div>
  }

  if (activeTeamError) {
    return <div>Error: {activeTeamError.message}</div>
  }

  return (
    <div>
      <h1>Team Overview</h1>
      <p>Active team: {activeTeam?.name}</p>
      <DateSelector />
      <DataTable columns={columns} data={teamPlayers} />
    </div>
  )
}
