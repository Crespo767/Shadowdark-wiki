import { Link } from 'react-router-dom'
import type { NPC } from '../../types/npc'
import { StatusBadge } from '../common/Badges'
import styles from './Cards.module.css'

export function NpcCard({ npc }: { npc: NPC }) {
  return (
    <Link className={styles.card} to={`/npcs/${npc.id}`}>
      <div className={styles.media}>{npc.portrait ? <img src={npc.portrait} alt={npc.name} /> : npc.name.slice(0, 1)}</div>
      <h2 className={styles.title}>{npc.name}</h2>
      <p className={styles.subtitle}>{npc.role}</p>
      <div className={styles.badges}>
        <StatusBadge status={npc.status} />
        <span className="badge">{npc.disposition}</span>
        {npc.faction && <span className="badge">{npc.faction}</span>}
        {npc.sessionIds.map((id) => <span className="badge" key={id}>{id}</span>)}
      </div>
    </Link>
  )
}
