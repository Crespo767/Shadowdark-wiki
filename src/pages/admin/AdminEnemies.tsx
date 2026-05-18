import { Link, useParams } from 'react-router-dom'
import { EnemyForm } from '../../components/admin/EnemyForm'
import { getEnemies } from '../../store/campaignStore'
import styles from '../../components/admin/Form.module.css'

export function AdminEnemies() {
  const { id } = useParams()
  const enemies = getEnemies()
  const enemy = enemies.find((item) => item.id === id)
  return (
    <>
      <h1 className="pageTitle">Inimigos</h1>
      <div className={styles.actions}><Link className="button" to="/admin/inimigos">Novo inimigo</Link></div>
      <div className={styles.list}>{enemies.map((item) => <Link key={item.id} to={`/admin/inimigos/${item.id}`}>{item.name} — {item.threat}</Link>)}</div>
      <EnemyForm key={id ?? 'new'} enemy={enemy} />
    </>
  )
}
