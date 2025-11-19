import { useEffect, useState } from 'react'
import { Search } from '../search/search'
import { usePlayers } from './usePlayers'
import { List } from './list'
import { Player } from '@/lib/types'
import { Spinner } from '@/components/ui/spinner'

export const Players = () => {
  const { players, playersError, playersLoading } = usePlayers()
  const [filteredPlayers, setFilteredPlayers] = useState<Player[] | undefined>(
    undefined
  )

  useEffect(() => {
    if (players) setFilteredPlayers(players)
  }, [players])

  if (playersLoading || !filteredPlayers?.length) {
    return <Spinner />
  }

  if (playersError) {
    return <div>playersError: {playersError.message}</div>
  }

  const handleSearch = (value: string) => {
    const filtered = players?.filter(
      (player) =>
        player.first_name.toLowerCase().includes(value.toLowerCase()) ||
        player.last_name.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredPlayers(filtered)
  }

  const handleClear = () => {
    setFilteredPlayers(players)
  }

  return (
    <div className="flex-1 flex flex-col gap-2">
      <Search onSearch={handleSearch} onClear={handleClear} />
      <List players={filteredPlayers} />
    </div>
  )
}
