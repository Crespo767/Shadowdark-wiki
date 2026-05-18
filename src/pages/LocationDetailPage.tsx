import { Link, useParams } from 'react-router-dom'
import { getLocations, getNpcs } from '../store/campaignStore'
import styles from './Pages.module.css'

export function LocationDetailPage() {
  const location = getLocations().find((item) => item.id === useParams().id)
  if (!location) return <p className={styles.notFound}>Local não encontrado.</p>
  const npcs = getNpcs().filter((npc) => location.notableNpcIds?.includes(npc.id))
  return (
    <article className="detailPanel">
      <h1 className="pageTitle">{location.name}</h1>
      <div className="metaList"><span className="badge">{location.type}</span><span className="badge">{location.status}</span>{location.dangerLevel && <span className="badge">{location.dangerLevel}</span>}</div>
      <p className={styles.sectionText}>{location.description}</p>
      {location.atmosphere && <blockquote className={styles.sectionText}>{location.atmosphere}</blockquote>}
      <div className="metaList">{npcs.map((npc) => <Link className="badge" to={`/npcs/${npc.id}`} key={npc.id}>{npc.name}</Link>)}</div>
      <div className="metaList">{location.sessionIds.map((id) => <Link className="badge" to={`/sessoes/${id}`} key={id}>{id}</Link>)}</div>
    </article>
  )
}
