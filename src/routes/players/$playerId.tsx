import { Spinner } from '@/components/ui/spinner'
import { usePlayer } from '@/features/players/usePlayer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/$playerId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { playerId } = Route.useParams()

  const { player, playerError, playerLoading } = usePlayer({
    id: playerId,
  })

  if (playerLoading) {
    return <Spinner />
  }

  if (playerError) {
    return <div>Error: {playerError.message}</div>
  }

  return <div>Hello {player?.last_name}!</div>
}
