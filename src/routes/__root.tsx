import { Nav } from '@/features/navigation'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <div className="p-2 pt-[52px]">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
