import { Players } from '@/features/players'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Players />
}
