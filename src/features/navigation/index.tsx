import { Link } from '@tanstack/react-router'

export const Nav = () => {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/teams" className="[&.active]:font-bold">
        Teams
      </Link>
      <Link to="/players" className="[&.active]:font-bold">
        Players
      </Link>
    </div>
  )
}
