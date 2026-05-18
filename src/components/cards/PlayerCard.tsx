import { Link } from 'react-router-dom'
import type { Player } from '../../types/player'
import { StatusBadge } from '../common/Badges'
import styles from './Cards.module.css'

export function PlayerCard({ player }: { player: Player }) {
  const initials = player.characterName.split(' ').map((part) => part[0]).join('').slice(0, 2)
  return (
    <Link className={styles.card} to={`/jogadores/${player.id}`}>
      <div className={styles.media}>{player.portrait ? <img src={player.portrait} alt={player.characterName} /> : initials}</div>
      <h2 className={styles.title}>{player.characterName}</h2>
      <p className={styles.subtitle}>{player.playerName}</p>
      <div className={styles.badges}>
        <span className="badge">{player.race}</span>
        <span className="badge">{player.class}</span>
        <span className="badge">Nível {player.level}</span>
        <StatusBadge status={player.alive ? 'alive' : 'dead'} />
      </div>
    </Link>
  )
}
