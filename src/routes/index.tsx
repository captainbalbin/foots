import { createFileRoute } from '@tanstack/react-router'
import { TeamOverview } from '@/features/teams/TeamOverview'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <TeamOverview />
}
