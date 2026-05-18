import { getEnemies, getLocations, getNpcs, getPlayers, getSessions } from '../../store/campaignStore'
import { formatDate } from '../../utils/format'
import styles from '../../components/admin/AdminLayout.module.css'

export function AdminDashboard() {
  const sessions = getSessions().sort((a, b) => b.date.localeCompare(a.date))
  const npcs = getNpcs()
  const players = getPlayers()

  return (
    <>
      <h1 className="pageTitle">Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.stat}><span>Sessões</span><strong>{sessions.length}</strong></div>
        <div className={styles.stat}><span>NPCs vivos / mortos</span><strong>{npcs.filter((n) => n.status === 'alive').length} / {npcs.filter((n) => n.status === 'dead').length}</strong></div>
        <div className={styles.stat}><span>Jogadores vivos / mortos</span><strong>{players.filter((p) => p.alive).length} / {players.filter((p) => !p.alive).length}</strong></div>
        <div className={styles.stat}><span>Inimigos</span><strong>{getEnemies().length}</strong></div>
        <div className={styles.stat}><span>Locais</span><strong>{getLocations().length}</strong></div>
        <div className={styles.stat}><span>Última sessão</span><strong>{sessions[0]?.number ?? '-'}</strong><p>{sessions[0] ? `${formatDate(sessions[0].date)} — ${sessions[0].title}` : 'Nenhuma'}</p></div>
      </div>
    </>
  )
}
