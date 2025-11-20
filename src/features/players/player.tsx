import { useParams } from '@tanstack/react-router'
import { usePlayer } from './usePlayer'
import { Spinner } from '@/components/ui/spinner'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Player = () => {
  const { playerId } = useParams({ from: '/players/$playerId' })

  const { player, playerError, playerLoading } = usePlayer({
    id: playerId,
  })

  if (playerLoading) {
    return <Spinner />
  }

  if (playerError) {
    return <div>Error: {playerError.message}</div>
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>
          {player?.first_name} {player?.last_name}
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex-col">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}
