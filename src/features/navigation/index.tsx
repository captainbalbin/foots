import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Nav = () => {
  const [activeLink, setActiveLink] = useState<number>(0)

  return (
    <div className="flex items-center justify-between fixed w-full bg-background opacity-100 z-50 ">
      <div className="p-2 flex gap-2">
        <Link to="/" onClick={() => setActiveLink(0)}>
          <Button variant={activeLink === 0 ? 'secondary' : 'ghost'}>
            Home
          </Button>
        </Link>
        <Link to="/teams" onClick={() => setActiveLink(1)}>
          <Button variant={activeLink === 1 ? 'secondary' : 'ghost'}>
            Teams
          </Button>
        </Link>
        <Link to="/players" onClick={() => setActiveLink(2)}>
          <Button variant={activeLink === 2 ? 'secondary' : 'ghost'}>
            Players
          </Button>
        </Link>
      </div>
    </div>
  )
}
