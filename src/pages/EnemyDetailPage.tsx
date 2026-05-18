import { Link, useParams } from 'react-router-dom'
import { getEnemies } from '../store/campaignStore'
import { ThreatBadge } from '../components/common/Badges'
import styles from './Pages.module.css'

export function EnemyDetailPage() {
  const enemy = getEnemies().find((item) => item.id === useParams().id)
  if (!enemy) return <p className={styles.notFound}>Inimigo não encontrado.</p>
  return (
    <article className="detailPanel">
      <h1 className="pageTitle">{enemy.name}</h1>
      <div className="metaList"><span className="badge">{enemy.type}</span><ThreatBadge threat={enemy.threat} /><span className="badge">{enemy.outcome}</span></div>
      <p className={styles.sectionText}>{enemy.description}</p>
      {enemy.tactics && <p className={styles.sectionText}><strong>Táticas:</strong> {enemy.tactics}</p>}
      {enemy.loot?.length ? <ul className={styles.list}>{enemy.loot.map((item) => <li key={item}>{item}</li>)}</ul> : null}
      <div className="metaList">{enemy.sessionIds.map((id) => <Link className="badge" to={`/sessoes/${id}`} key={id}>{id}</Link>)}</div>
    </article>
  )
}
