import { Spinner } from '@/components/ui/spinner'
import { useTeam } from '@/features/teams/useTeam'
import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/$teamId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { teamId } = useParams({ from: '/teams/$teamId' })
  const { team, isPending } = useTeam(teamId)

  if (isPending) {
    return <Spinner />
  }

  return <div>{team?.name}</div>
}
