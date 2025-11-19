import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export const Nav = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="p-2 flex gap-2">
        {(
          [
            ['/', 'Home'],
            ['/teams', 'Teams'],
            ['/players', 'Players'],
          ] as const
        ).map(([to, label]) => {
          return (
            <Link to={to}>
              {({ isActive }) => {
                return (
                  <Button variant={isActive ? 'secondary' : 'ghost'}>
                    {label}
                  </Button>
                )
              }}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
