import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NPC, NpcDisposition, NpcStatus } from '../../types/npc'
import { deleteNpc, getLocations, getSessions, upsertNpc } from '../../store/campaignStore'
import { slugify } from '../../utils/format'
import { fromCsv, toCsv } from './formHelpers'
import styles from './Form.module.css'

const empty: NPC = { id: '', name: '', role: '', status: 'alive', disposition: 'neutro', description: '', sessionIds: [] }

export function NpcForm({ npc }: { npc?: NPC }) {
  const [data, setData] = useState<NPC>(npc ?? empty)
  const [sessions, setSessions] = useState(toCsv(npc?.sessionIds))
  const [locations, setLocations] = useState(toCsv(npc?.locationIds))
  const navigate = useNavigate()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const id = data.id || slugify(data.name)
    upsertNpc({ ...data, id, sessionIds: fromCsv(sessions), locationIds: fromCsv(locations) })
    navigate(`/admin/npcs/${id}`)
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}><div className={styles.field}><label>ID</label><input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} /></div><div className={styles.field}><label>Nome</label><input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value, id: data.id || slugify(e.target.value) })} required /></div></div>
      <div className={styles.field}><label>Role</label><input value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} /></div>
      <div className={styles.row}><div className={styles.field}><label>Status</label><select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value as NpcStatus })}>{['alive','dead','unknown','missing'].map((v) => <option key={v}>{v}</option>)}</select></div><div className={styles.field}><label>Disposition</label><select value={data.disposition} onChange={(e) => setData({ ...data, disposition: e.target.value as NpcDisposition })}>{['aliado','neutro','hostil','desconhecido'].map((v) => <option key={v}>{v}</option>)}</select></div></div>
      <div className={styles.row}><div className={styles.field}><label>Facção</label><input value={data.faction ?? ''} onChange={(e) => setData({ ...data, faction: e.target.value })} /></div><div className={styles.field}><label>Portrait</label><input value={data.portrait ?? ''} onChange={(e) => setData({ ...data, portrait: e.target.value })} /></div></div>
      <div className={styles.field}><label>Descrição</label><textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></div>
      <div className={styles.field}><label>Privado — não aparece no site</label><textarea value={data.masterNotes ?? ''} onChange={(e) => setData({ ...data, masterNotes: e.target.value })} /></div>
      <div className={styles.row}><div className={styles.field}><label>Sessões ({getSessions().map((s) => s.id).join(', ')})</label><input value={sessions} onChange={(e) => setSessions(e.target.value)} /></div><div className={styles.field}><label>Locais ({getLocations().map((l) => l.id).join(', ')})</label><input value={locations} onChange={(e) => setLocations(e.target.value)} /></div></div>
      <div className={styles.actions}><button className="button">Salvar</button><button type="button" className="button" onClick={() => navigate('/admin/npcs')}>Cancelar</button>{npc && <button type="button" className="dangerButton" onClick={() => { if (confirm('Excluir NPC?')) { deleteNpc(npc.id); navigate('/admin/npcs') } }}>Excluir</button>}</div>
    </form>
  )
}
