import { usePlayer } from '@/features/players/usePlayer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/$playerId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { playerId } = Route.useParams()

  const { player, playerError, playerLoading } = usePlayer({
    id: Number(playerId),
  })

  if (playerLoading) {
    return <div>Loading...</div>
  }

  if (playerError) {
    return <div>Error: {playerError.message}</div>
  }

  return <div>Hello {player?.last_name}!</div>
}
