import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updatePlayerQueryOptions } from './queries'
import { UpdatePlayer } from './types'
import { teamPlayersQueryOptions } from '../teams/queries'

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    ...updatePlayerQueryOptions,
    mutationFn: ({ id, player }: { id: string; player: UpdatePlayer }) =>
      updatePlayerQueryOptions.mutationFn(id, player),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({
        queryKey: teamPlayersQueryOptions(vars.id).queryKey,
      })
    },
    onError: (error) => {
      console.error('Error updating player:', error)
    },
  })

  return {
    updatePlayer: mutate,
    updatePlayerLoading: isPending,
    updatePlayerError: error,
  }
}
