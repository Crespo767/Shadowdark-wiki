import { Link, useParams } from 'react-router-dom'
import { SessionForm } from '../../components/admin/SessionForm'
import { getSessions } from '../../store/campaignStore'
import styles from '../../components/admin/Form.module.css'

export function AdminSessions() {
  const { id } = useParams()
  const sessions = getSessions().sort((a, b) => a.number - b.number)
  const session = sessions.find((item) => item.id === id)
  return (
    <>
      <h1 className="pageTitle">Sessões</h1>
      <div className={styles.actions}><Link className="button" to="/admin/sessoes">Nova sessão</Link></div>
      <div className={styles.list}>{sessions.map((item) => <Link key={item.id} to={`/admin/sessoes/${item.id}`}>Cap. {item.number} — {item.title}</Link>)}</div>
      <SessionForm key={id ?? 'new'} session={session} />
    </>
  )
}
