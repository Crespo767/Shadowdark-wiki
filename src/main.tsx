import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { GrimoireLayout } from './components/layout/GrimoireLayout'
import { AdminLayout } from './components/admin/AdminLayout'
import { Home } from './pages/Home'
import { SessionPage } from './pages/SessionPage'
import { NpcsPage } from './pages/NpcsPage'
import { NpcDetailPage } from './pages/NpcDetailPage'
import { PlayersPage } from './pages/PlayersPage'
import { PlayerDetailPage } from './pages/PlayerDetailPage'
import { EnemiesPage } from './pages/EnemiesPage'
import { EnemyDetailPage } from './pages/EnemyDetailPage'
import { LocationsPage } from './pages/LocationsPage'
import { LocationDetailPage } from './pages/LocationDetailPage'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminSessions } from './pages/admin/AdminSessions'
import { AdminNpcs } from './pages/admin/AdminNpcs'
import { AdminPlayers } from './pages/admin/AdminPlayers'
import { AdminEnemies } from './pages/admin/AdminEnemies'
import { AdminLocations } from './pages/admin/AdminLocations'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GrimoireLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sessoes/:id', element: <SessionPage /> },
      { path: 'npcs', element: <NpcsPage /> },
      { path: 'npcs/:id', element: <NpcDetailPage /> },
      { path: 'jogadores', element: <PlayersPage /> },
      { path: 'jogadores/:id', element: <PlayerDetailPage /> },
      { path: 'inimigos', element: <EnemiesPage /> },
      { path: 'inimigos/:id', element: <EnemyDetailPage /> },
      { path: 'locais', element: <LocationsPage /> },
      { path: 'locais/:id', element: <LocationDetailPage /> },
    ],
  },
  { path: '/admin', element: <AdminLogin /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'sessoes', element: <AdminSessions /> },
      { path: 'sessoes/:id', element: <AdminSessions /> },
      { path: 'npcs', element: <AdminNpcs /> },
      { path: 'npcs/:id', element: <AdminNpcs /> },
      { path: 'jogadores', element: <AdminPlayers /> },
      { path: 'jogadores/:id', element: <AdminPlayers /> },
      { path: 'inimigos', element: <AdminEnemies /> },
      { path: 'inimigos/:id', element: <AdminEnemies /> },
      { path: 'locais', element: <AdminLocations /> },
      { path: 'locais/:id', element: <AdminLocations /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
