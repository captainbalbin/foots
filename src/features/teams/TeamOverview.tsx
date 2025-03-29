import { useActiveTeam } from './useActiveTeam'

export const TeamOverview = () => {
  const { activeTeam, activeTeamError, activeTeamLoading } = useActiveTeam()

  if (activeTeamLoading) {
    return <div>Loading...</div>
  }

  if (activeTeamError) {
    return <div>Error: {activeTeamError.message}</div>
  }

  return (
    <div>
      <h1>Team Overview</h1>
      <p>Active team: {activeTeam?.name}</p>
    </div>
  )
}
