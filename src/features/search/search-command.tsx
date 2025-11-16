import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'

export const Search = () => {
  const [searchValue, setSearchValue] = useState('')

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  return (
    <Input
      placeholder="Search players..."
      value={searchValue}
      onChange={handleSearch}
    />
  )
}
