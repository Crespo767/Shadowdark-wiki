import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Block, BlockType, Session } from '../../types/session'
import { deleteSession, upsertSession } from '../../store/campaignStore'
import { slugify } from '../../utils/format'
import { fromCsv, toCsv } from './formHelpers'
import styles from './Form.module.css'

const empty: Session = { id: '', number: 1, title: '', date: new Date().toISOString().slice(0, 10), teaser: '', tags: [], content: [] }

const newBlock = (type: BlockType): Block => {
  if (type === 'paragraph') return { type, text: '' }
  if (type === 'quote') return { type, text: '', attribution: '' }
  if (type === 'image') return { type, src: '', alt: '', caption: '', position: 'full' }
  if (type === 'gallery') return { type, images: [] }
  if (type === 'npc') return { type, npcId: '' }
  if (type === 'highlight') return { type, text: '', label: '' }
  return { type: 'divider' }
}

export function SessionForm({ session }: { session?: Session }) {
  const [data, setData] = useState<Session>(session ?? empty)
  const [tags, setTags] = useState(toCsv(session?.tags))
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const contentText = useMemo(() => JSON.stringify(data.content, null, 2), [data.content])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const id = data.id || slugify(data.title)
    upsertSession({ ...data, id, tags: fromCsv(tags), number: Number(data.number) || 1 })
    setMessage('Sessão salva.')
    navigate(`/admin/sessoes/${id}`)
  }

  const moveBlock = (index: number, delta: number) => {
    const copy = [...data.content]
    const target = index + delta
    if (target < 0 || target >= copy.length) return
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
    setData({ ...data, content: copy })
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}>
        <div className={styles.field}><label>ID</label><input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} placeholder={slugify(data.title)} /></div>
        <div className={styles.field}><label>Número</label><input type="number" value={data.number} onChange={(e) => setData({ ...data, number: Number(e.target.value) })} /></div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}><label>Título</label><input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value, id: data.id || slugify(e.target.value) })} required /></div>
        <div className={styles.field}><label>Data</label><input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} /></div>
      </div>
      <div className={styles.field}><label>Subtítulo</label><input value={data.subtitle ?? ''} onChange={(e) => setData({ ...data, subtitle: e.target.value })} /></div>
      <div className={styles.field}><label>Capa</label><input value={data.coverImage ?? ''} onChange={(e) => setData({ ...data, coverImage: e.target.value })} /></div>
      <div className={styles.field}><label>Teaser</label><textarea value={data.teaser} onChange={(e) => setData({ ...data, teaser: e.target.value })} /></div>
      <div className={styles.field}><label>Tags (separadas por vírgula)</label><input value={tags} onChange={(e) => setTags(e.target.value)} /></div>
      <div className={styles.field}>
        <label>Blocos</label>
        <div className={styles.actions}>
          {(['paragraph', 'quote', 'image', 'gallery', 'npc', 'highlight', 'divider'] as BlockType[]).map((type) => (
            <button className="button" type="button" key={type} onClick={() => setData({ ...data, content: [...data.content, newBlock(type)] })}>{type}</button>
          ))}
        </div>
        <div className={styles.list}>
          {data.content.map((block, index) => (
            <div className="detailPanel" key={index}>
              <strong>{index + 1}. {block.type}</strong>
              <div className={styles.actions}>
                <button type="button" className="button" onClick={() => moveBlock(index, -1)}>↑</button>
                <button type="button" className="button" onClick={() => moveBlock(index, 1)}>↓</button>
                <button type="button" className="dangerButton" onClick={() => setData({ ...data, content: data.content.filter((_, i) => i !== index) })}>×</button>
              </div>
            </div>
          ))}
        </div>
        <textarea
          value={contentText}
          onChange={(e) => {
            try {
              setData({ ...data, content: JSON.parse(e.target.value || '[]') })
            } catch {
              setMessage('JSON de blocos inválido.')
            }
          }}
        />
      </div>
      <div className={styles.actions}>
        <button className="button">Salvar</button>
        <button type="button" className="button" onClick={() => navigate('/admin/sessoes')}>Cancelar</button>
        {session && <button type="button" className="dangerButton" onClick={() => { if (confirm('Excluir sessão?')) { deleteSession(session.id); navigate('/admin/sessoes') } }}>Excluir</button>}
        {message && <span className={styles.notice}>{message}</span>}
      </div>
    </form>
  )
}
