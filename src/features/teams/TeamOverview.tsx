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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-bold">{activeTeam?.name}</h1>
        <DateSelector />
      </div>
      <DataTable columns={columns} data={teamPlayers} />
    </div>
  )
}
