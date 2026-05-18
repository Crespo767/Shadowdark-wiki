import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { exportAll, importAll, isLoggedIn, logout } from '../../store/campaignStore'
import styles from './AdminLayout.module.css'

export function AdminLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin', { replace: true })
  }, [navigate])

  const importJson = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      importAll(String(reader.result ?? '{}'))
      window.location.reload()
    }
    reader.readAsText(file)
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Admin ShadowDark</div>
        <nav className={styles.nav}>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/sessoes">Sessões</NavLink>
          <NavLink to="/admin/npcs">NPCs</NavLink>
          <NavLink to="/admin/jogadores">Jogadores</NavLink>
          <NavLink to="/admin/inimigos">Inimigos</NavLink>
          <NavLink to="/admin/locais">Locais</NavLink>
        </nav>
        <div className={styles.footer}>
          <button className="button" onClick={exportAll}>Exportar JSON</button>
          <label className="button">
            Importar JSON
            <input type="file" accept="application/json" hidden onChange={(event) => importJson(event.target.files?.[0])} />
          </label>
          <button className="dangerButton" onClick={() => { logout(); navigate('/admin') }}>Sair</button>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
