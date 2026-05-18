import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Location, LocationStatus, LocationType } from '../../types/location'
import { deleteLocation, getNpcs, getSessions, upsertLocation } from '../../store/campaignStore'
import { slugify } from '../../utils/format'
import { fromCsv, toCsv } from './formHelpers'
import styles from './Form.module.css'

const empty: Location = { id: '', name: '', type: 'cidade', status: 'desconhecido', description: '', sessionIds: [] }

export function LocationForm({ location }: { location?: Location }) {
  const [data, setData] = useState<Location>(location ?? empty)
  const [images, setImages] = useState(toCsv(location?.images))
  const [npcs, setNpcs] = useState(toCsv(location?.notableNpcIds))
  const [sessions, setSessions] = useState(toCsv(location?.sessionIds))
  const navigate = useNavigate()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const id = data.id || slugify(data.name)
    upsertLocation({ ...data, id, images: fromCsv(images), notableNpcIds: fromCsv(npcs), sessionIds: fromCsv(sessions) })
    navigate(`/admin/locais/${id}`)
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}><div className={styles.field}><label>ID</label><input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} /></div><div className={styles.field}><label>Nome</label><input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value, id: data.id || slugify(e.target.value) })} required /></div></div>
      <div className={styles.row}><div className={styles.field}><label>Tipo</label><select value={data.type} onChange={(e) => setData({ ...data, type: e.target.value as LocationType })}>{['cidade','dungeon','ruína','floresta','torre','taverna','templo','outro'].map((v) => <option key={v}>{v}</option>)}</select></div><div className={styles.field}><label>Status</label><select value={data.status} onChange={(e) => setData({ ...data, status: e.target.value as LocationStatus })}>{['explorado','parcial','desconhecido'].map((v) => <option key={v}>{v}</option>)}</select></div></div>
      <div className={styles.row}><div className={styles.field}><label>Mapa</label><input value={data.mapImage ?? ''} onChange={(e) => setData({ ...data, mapImage: e.target.value })} /></div><div className={styles.field}><label>Perigo</label><select value={data.dangerLevel ?? ''} onChange={(e) => setData({ ...data, dangerLevel: e.target.value as Location['dangerLevel'] })}><option value="">-</option>{['seguro','arriscado','mortal'].map((v) => <option key={v}>{v}</option>)}</select></div></div>
      <div className={styles.field}><label>Imagens</label><input value={images} onChange={(e) => setImages(e.target.value)} /></div>
      <div className={styles.field}><label>Descrição</label><textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></div>
      <div className={styles.field}><label>Atmosfera</label><textarea value={data.atmosphere ?? ''} onChange={(e) => setData({ ...data, atmosphere: e.target.value })} /></div>
      <div className={styles.row}><div className={styles.field}><label>NPCs ({getNpcs().map((n) => n.id).join(', ')})</label><input value={npcs} onChange={(e) => setNpcs(e.target.value)} /></div><div className={styles.field}><label>Sessões ({getSessions().map((s) => s.id).join(', ')})</label><input value={sessions} onChange={(e) => setSessions(e.target.value)} /></div></div>
      <div className={styles.actions}><button className="button">Salvar</button><button type="button" className="button" onClick={() => navigate('/admin/locais')}>Cancelar</button>{location && <button type="button" className="dangerButton" onClick={() => { if (confirm('Excluir local?')) { deleteLocation(location.id); navigate('/admin/locais') } }}>Excluir</button>}</div>
    </form>
  )
}
