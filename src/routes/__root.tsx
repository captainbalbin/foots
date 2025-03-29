import { Nav } from '@/features/navigation'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
