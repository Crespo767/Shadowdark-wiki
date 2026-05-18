import { Link, useParams } from 'react-router-dom'
import { NpcForm } from '../../components/admin/NpcForm'
import { getNpcs } from '../../store/campaignStore'
import styles from '../../components/admin/Form.module.css'

export function AdminNpcs() {
  const { id } = useParams()
  const npcs = getNpcs()
  const npc = npcs.find((item) => item.id === id)
  return (
    <>
      <h1 className="pageTitle">NPCs</h1>
      <div className={styles.actions}><Link className="button" to="/admin/npcs">Novo NPC</Link></div>
      <div className={styles.list}>{npcs.map((item) => <Link key={item.id} to={`/admin/npcs/${item.id}`}>{item.name} — {item.role}</Link>)}</div>
      <NpcForm key={id ?? 'new'} npc={npc} />
    </>
  )
}
