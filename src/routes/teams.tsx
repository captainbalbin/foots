import { createFileRoute } from '@tanstack/react-router'
import { Teams } from '@/features/teams'

export const Route = createFileRoute('/teams')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Teams />
}
