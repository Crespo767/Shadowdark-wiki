import { Link, useParams } from 'react-router-dom'
import { LocationForm } from '../../components/admin/LocationForm'
import { getLocations } from '../../store/campaignStore'
import styles from '../../components/admin/Form.module.css'

export function AdminLocations() {
  const { id } = useParams()
  const locations = getLocations()
  const location = locations.find((item) => item.id === id)
  return (
    <>
      <h1 className="pageTitle">Locais</h1>
      <div className={styles.actions}><Link className="button" to="/admin/locais">Novo local</Link></div>
      <div className={styles.list}>{locations.map((item) => <Link key={item.id} to={`/admin/locais/${item.id}`}>{item.name} — {item.type}</Link>)}</div>
      <LocationForm key={id ?? 'new'} location={location} />
    </>
  )
}
