import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { Team } from '@/lib/types'
import { useActivateTeam } from './useActivateTeam'
import { useTeams } from './useTeams'
import { Link } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'

export const Teams = () => {
  const { teams, isPending, error } = useTeams()
  const { activateTeam, activating, activationError } = useActivateTeam()

  const handleActivateTeam = (id: string) => {
    activateTeam(id)
  }

  if (isPending) {
    return <Spinner />
  }

  if (activationError) {
    return <div>Mutation error: {activationError.message}</div>
  }

  if (error || !teams) {
    return <div>Query error: {error?.message}</div>
  }

  return (
    <div>
      {teams.map((team: Team) => {
        return (
          <div key={team.id}>
            <Link to={team.id}>
              <p>{team.name}</p>
            </Link>
            {!team.active && (
              <Button
                disabled={activating}
                onClick={() => handleActivateTeam(team.id)}
              >
                {activating && <Loader2 className="animate-spin" />}
                Make active
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
