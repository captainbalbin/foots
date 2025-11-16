import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useState } from 'react'
import { X } from 'lucide-react'

type SearchProps = {
  onSearch: (value: string) => void
  onClear: () => void
}

export const Search = ({ onSearch, onClear }: SearchProps) => {
  const [searchValue, setSearchValue] = useState('')

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    onSearch(e.target.value)
  }

  function handleClear() {
    setSearchValue('')
    onClear()
  }

  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Search players..."
        value={searchValue}
        onChange={handleSearch}
        type="search"
        size={1}
        className="max-w-sm rounded-xl"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={!searchValue}
        onClick={handleClear}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
      >
        <X />
      </Button>
    </div>
  )
}
