import { Link } from 'react-router-dom'
import type { Location } from '../../types/location'
import styles from './Cards.module.css'

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link className={styles.card} to={`/locais/${location.id}`}>
      <div
        className={`${styles.media} ${styles.locationMedia}`}
        style={location.mapImage ? { backgroundImage: `url(${location.mapImage})` } : undefined}
      >
        <h2 className={styles.title}>{location.name}</h2>
      </div>
      <p className={styles.subtitle}>{location.description}</p>
      <div className={styles.badges}>
        <span className="badge">{location.type}</span>
        <span className="badge">{location.status}</span>
        {location.dangerLevel && <span className="badge">{location.dangerLevel}</span>}
      </div>
    </Link>
  )
}
