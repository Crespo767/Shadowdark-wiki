import { Link, useParams } from 'react-router-dom'
import { getNpcs } from '../store/campaignStore'
import { StatusBadge } from '../components/common/Badges'
import styles from './Pages.module.css'

export function NpcDetailPage() {
  const npc = getNpcs().find((item) => item.id === useParams().id)
  if (!npc) return <p className={styles.notFound}>NPC não encontrado.</p>
  return (
    <article className="detailPanel">
      <h1 className="pageTitle">{npc.name}</h1>
      <p className="pageLead">{npc.role}</p>
      <div className="metaList"><StatusBadge status={npc.status} /><span className="badge">{npc.disposition}</span>{npc.faction && <span className="badge">{npc.faction}</span>}</div>
      <p className={styles.sectionText}>{npc.description}</p>
      <div className="metaList">{npc.sessionIds.map((id) => <Link className="badge" to={`/sessoes/${id}`} key={id}>{id}</Link>)}</div>
    </article>
  )
}
