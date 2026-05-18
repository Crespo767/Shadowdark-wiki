import { Link } from 'react-router-dom'
import type { Enemy } from '../../types/enemy'
import { ThreatBadge } from '../common/Badges'
import styles from './Cards.module.css'

export function EnemyCard({ enemy }: { enemy: Enemy }) {
  return (
    <Link className={styles.card} to={`/inimigos/${enemy.id}`}>
      <div className={styles.media}>{enemy.image ? <img src={enemy.image} alt={enemy.name} /> : '☠'}</div>
      <h2 className={styles.title}>{enemy.name}</h2>
      <p className={styles.subtitle}>{enemy.description}</p>
      <div className={styles.badges}>
        <span className="badge">{enemy.type}</span>
        <ThreatBadge threat={enemy.threat} />
        <span className="badge">{enemy.outcome}</span>
      </div>
    </Link>
  )
}
