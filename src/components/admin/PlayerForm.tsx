import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Player } from '../../types/player'
import { deletePlayer, getSessions, upsertPlayer } from '../../store/campaignStore'
import { slugify } from '../../utils/format'
import { fromCsv, toCsv } from './formHelpers'
import styles from './Form.module.css'

const empty: Player = { id: '', playerName: '', characterName: '', race: '', class: '', level: 1, background: '', inventory: [], bonds: [], alive: true, sessionIds: [] }

export function PlayerForm({ player }: { player?: Player }) {
  const [data, setData] = useState<Player>(player ?? empty)
  const [inventory, setInventory] = useState(toCsv(player?.inventory))
  const [bonds, setBonds] = useState(toCsv(player?.bonds))
  const [sessions, setSessions] = useState(toCsv(player?.sessionIds))
  const navigate = useNavigate()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const id = data.id || slugify(data.characterName)
    upsertPlayer({ ...data, id, inventory: fromCsv(inventory), bonds: fromCsv(bonds), sessionIds: fromCsv(sessions), level: Number(data.level) || 1 })
    navigate(`/admin/jogadores/${id}`)
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}><div className={styles.field}><label>ID</label><input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} /></div><div className={styles.field}><label>Personagem</label><input value={data.characterName} onChange={(e) => setData({ ...data, characterName: e.target.value, id: data.id || slugify(e.target.value) })} required /></div></div>
      <div className={styles.row}><div className={styles.field}><label>Jogador</label><input value={data.playerName} onChange={(e) => setData({ ...data, playerName: e.target.value })} /></div><div className={styles.field}><label>Retrato</label><input value={data.portrait ?? ''} onChange={(e) => setData({ ...data, portrait: e.target.value })} /></div></div>
      <div className={styles.row}><div className={styles.field}><label>Raça</label><input value={data.race} onChange={(e) => setData({ ...data, race: e.target.value })} /></div><div className={styles.field}><label>Classe</label><input value={data.class} onChange={(e) => setData({ ...data, class: e.target.value })} /></div></div>
      <div className={styles.row}><div className={styles.field}><label>Nível</label><input type="number" value={data.level} onChange={(e) => setData({ ...data, level: Number(e.target.value) })} /></div><div className={styles.field}><label>Vivo</label><select value={String(data.alive)} onChange={(e) => setData({ ...data, alive: e.target.value === 'true' })}><option value="true">vivo</option><option value="false">morto</option></select></div></div>
      <div className={styles.field}><label>Background</label><textarea value={data.background} onChange={(e) => setData({ ...data, background: e.target.value })} /></div>
      <div className={styles.field}><label>Inventário</label><input value={inventory} onChange={(e) => setInventory(e.target.value)} /></div>
      <div className={styles.field}><label>Laços</label><input value={bonds} onChange={(e) => setBonds(e.target.value)} /></div>
      {!data.alive && <div className={styles.field}><label>Nota de morte</label><textarea value={data.deathNote ?? ''} onChange={(e) => setData({ ...data, deathNote: e.target.value })} /></div>}
      <div className={styles.field}><label>Sessões ({getSessions().map((s) => s.id).join(', ')})</label><input value={sessions} onChange={(e) => setSessions(e.target.value)} /></div>
      <div className={styles.actions}><button className="button">Salvar</button><button type="button" className="button" onClick={() => navigate('/admin/jogadores')}>Cancelar</button>{player && <button type="button" className="dangerButton" onClick={() => { if (confirm('Excluir jogador?')) { deletePlayer(player.id); navigate('/admin/jogadores') } }}>Excluir</button>}</div>
    </form>
  )
}
