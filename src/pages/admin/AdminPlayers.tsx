import { Link, useParams } from 'react-router-dom'
import { PlayerForm } from '../../components/admin/PlayerForm'
import { getPlayers } from '../../store/campaignStore'
import styles from '../../components/admin/Form.module.css'

export function AdminPlayers() {
  const { id } = useParams()
  const players = getPlayers()
  const player = players.find((item) => item.id === id)
  return (
    <>
      <h1 className="pageTitle">Jogadores</h1>
      <div className={styles.actions}><Link className="button" to="/admin/jogadores">Novo jogador</Link></div>
      <div className={styles.list}>{players.map((item) => <Link key={item.id} to={`/admin/jogadores/${item.id}`}>{item.characterName} — {item.playerName}</Link>)}</div>
      <PlayerForm key={id ?? 'new'} player={player} />
    </>
  )
}
