import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlayerQueryOptions, playersQueryOptions } from './queries'

export const useCreatePlayer = () => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    ...createPlayerQueryOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playersQueryOptions.queryKey })
    },
    onError: (error) => {
      console.error('Error fetching data:', error)
    },
  })

  return {
    createPlayer: mutate,
  }
}
