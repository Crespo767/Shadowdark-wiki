import { NavLink } from 'react-router-dom'
import { getSessions } from '../../store/campaignStore'
import styles from './Sidebar.module.css'

const Icon = ({ kind }: { kind: 'book' | 'mask' | 'shield' | 'skull' | 'map' }) => {
  const paths = {
    book: 'M4 5h6a3 3 0 0 1 3 3v11a3 3 0 0 0-3-3H4z M20 5h-6a3 3 0 0 0-3 3v11a3 3 0 0 1 3-3h6z',
    mask: 'M5 8c2-2 5-2 7 0 2-2 5-2 7 0v5c0 4-3 7-7 7s-7-3-7-7z M8 12h2 M14 12h2',
    shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
    skull: 'M12 3c4 0 7 3 7 7 0 3-2 5-4 6v3H9v-3c-2-1-4-3-4-6 0-4 3-7 7-7z M9 10h.01 M15 10h.01 M10 15h4',
    map: 'M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z M9 4v14 M15 6v14',
  }
  return <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={paths[kind]} /></svg>
}

export function Sidebar({ open }: { open: boolean }) {
  const sessions = getSessions().sort((a, b) => a.number - b.number)
  const itemClass = ({ isActive }: { isActive: boolean }) => `${styles.sidebarItem} ${isActive ? styles.active : ''}`

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <NavLink to="/" className={styles.brand}>Campanha ShadowDark</NavLink>
      <p className={styles.subtitle}>Campanha de ShadowDark</p>
      <div className={styles.divider}>✦</div>
      <div className={styles.section}>Sessões</div>
      {sessions.map((session) => (
        <NavLink key={session.id} to={`/sessoes/${session.id}`} className={itemClass}>
          <Icon kind="book" />
          <span>Cap. {session.number} — {session.title}</span>
        </NavLink>
      ))}
      <div className={styles.section}>Índice</div>
      <NavLink to="/npcs" className={itemClass}><Icon kind="mask" />NPCs</NavLink>
      <NavLink to="/jogadores" className={itemClass}><Icon kind="shield" />Jogadores</NavLink>
      <NavLink to="/inimigos" className={itemClass}><Icon kind="skull" />Inimigos</NavLink>
      <NavLink to="/locais" className={itemClass}><Icon kind="map" />Locais</NavLink>
      <NavLink to="/admin" className={itemClass}><Icon kind="book" />Admin</NavLink>
    </aside>
  )
}
