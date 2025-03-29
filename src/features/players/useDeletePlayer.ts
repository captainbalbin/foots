import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePlayerQueryOptions, playersQueryOptions } from './queries'

export const useDeletePlayer = () => {
  const queryClient = useQueryClient()

  const { mutate, isPending, error } = useMutation({
    ...deletePlayerQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playersQueryOptions.queryKey })
    },
    onError: (error) => {
      console.error('Error deleting player:', error)
    },
  })

  return {
    deletePlayer: mutate,
    deletePlayerLoading: isPending,
    deletePlayerError: error,
  }
}
