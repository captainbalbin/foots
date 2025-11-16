import { Nav } from '@/features/navigation'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Nav />
      <main className="flex-1 overflow-auto p-4 flex w-full">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})
