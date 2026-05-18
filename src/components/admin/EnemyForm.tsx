import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Enemy, EnemyOutcome, EnemyThreat, EnemyType } from '../../types/enemy'
import { deleteEnemy, getSessions, upsertEnemy } from '../../store/campaignStore'
import { slugify } from '../../utils/format'
import { fromCsv, toCsv } from './formHelpers'
import styles from './Form.module.css'

const empty: Enemy = { id: '', name: '', type: 'criatura', threat: 'baixa', description: '', outcome: 'ativo', sessionIds: [] }

export function EnemyForm({ enemy }: { enemy?: Enemy }) {
  const [data, setData] = useState<Enemy>(enemy ?? empty)
  const [loot, setLoot] = useState(toCsv(enemy?.loot))
  const [sessions, setSessions] = useState(toCsv(enemy?.sessionIds))
  const navigate = useNavigate()
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const id = data.id || slugify(data.name)
    upsertEnemy({ ...data, id, loot: fromCsv(loot), sessionIds: fromCsv(sessions) })
    navigate(`/admin/inimigos/${id}`)
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.row}><div className={styles.field}><label>ID</label><input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} /></div><div className={styles.field}><label>Nome</label><input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value, id: data.id || slugify(e.target.value) })} required /></div></div>
      <div className={styles.row}><div className={styles.field}><label>Tipo</label><select value={data.type} onChange={(e) => setData({ ...data, type: e.target.value as EnemyType })}>{['criatura','humanoide','morto-vivo','demônio','chefe','outro'].map((v) => <option key={v}>{v}</option>)}</select></div><div className={styles.field}><label>Ameaça</label><select value={data.threat} onChange={(e) => setData({ ...data, threat: e.target.value as EnemyThreat })}>{['baixa','média','alta','letal'].map((v) => <option key={v}>{v}</option>)}</select></div></div>
      <div className={styles.row}><div className={styles.field}><label>Imagem</label><input value={data.image ?? ''} onChange={(e) => setData({ ...data, image: e.target.value })} /></div><div className={styles.field}><label>Resultado</label><select value={data.outcome} onChange={(e) => setData({ ...data, outcome: e.target.value as EnemyOutcome })}>{['derrotado','fugiu','recorrente','aliado','ativo'].map((v) => <option key={v}>{v}</option>)}</select></div></div>
      <div className={styles.field}><label>Descrição</label><textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} /></div>
      <div className={styles.field}><label>Táticas</label><textarea value={data.tactics ?? ''} onChange={(e) => setData({ ...data, tactics: e.target.value })} /></div>
      <div className={styles.field}><label>Loot</label><input value={loot} onChange={(e) => setLoot(e.target.value)} /></div>
      <div className={styles.field}><label>Sessões ({getSessions().map((s) => s.id).join(', ')})</label><input value={sessions} onChange={(e) => setSessions(e.target.value)} /></div>
      <div className={styles.actions}><button className="button">Salvar</button><button type="button" className="button" onClick={() => navigate('/admin/inimigos')}>Cancelar</button>{enemy && <button type="button" className="dangerButton" onClick={() => { if (confirm('Excluir inimigo?')) { deleteEnemy(enemy.id); navigate('/admin/inimigos') } }}>Excluir</button>}</div>
    </form>
  )
}
