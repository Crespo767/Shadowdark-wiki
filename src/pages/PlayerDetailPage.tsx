import { Link, useParams } from 'react-router-dom'
import { getPlayers } from '../store/campaignStore'
import { StatusBadge } from '../components/common/Badges'
import styles from './Pages.module.css'

export function PlayerDetailPage() {
  const player = getPlayers().find((item) => item.id === useParams().id)
  if (!player) return <p className={styles.notFound}>Jogador não encontrado.</p>
  return (
    <article className="detailPanel">
      <h1 className="pageTitle">{player.characterName}</h1>
      <p className="pageLead">{player.playerName} — {player.race} {player.class}, nível {player.level}</p>
      <div className="metaList"><StatusBadge status={player.alive ? 'alive' : 'dead'} /></div>
      <p className={styles.sectionText}>{player.background}</p>
      <h2 className={styles.chapterTitle}>Inventário</h2>
      <ul className={styles.list}>{player.inventory.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2 className={styles.chapterTitle}>Laços</h2>
      <ul className={styles.list}>{player.bonds.map((bond) => <li key={bond}>{bond}</li>)}</ul>
      {!player.alive && player.deathNote && <p className={styles.sectionText}>{player.deathNote}</p>}
      <div className="metaList">{player.sessionIds.map((id) => <Link className="badge" to={`/sessoes/${id}`} key={id}>{id}</Link>)}</div>
    </article>
  )
}
