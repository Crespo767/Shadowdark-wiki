import { useState } from 'react'
import { getEnemies } from '../store/campaignStore'
import { EnemyCard } from '../components/cards/EnemyCard'

export function EnemiesPage() {
  const [filter, setFilter] = useState('todos')
  const enemies = getEnemies()
  const filtered = filter === 'todos' ? enemies : enemies.filter((enemy) => enemy.type === filter || enemy.threat === filter || enemy.outcome === filter)
  const options = ['todos', 'criatura', 'humanoide', 'morto-vivo', 'demônio', 'chefe', 'baixa', 'média', 'alta', 'letal', 'ativo', 'derrotado']
  return (
    <>
      <h1 className="pageTitle">Bestiário</h1>
      <p className="pageLead">{filtered.length} inimigos encontrados</p>
      <div className="filterBar">{options.map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div>
      <div className="grid">{filtered.map((enemy) => <EnemyCard key={enemy.id} enemy={enemy} />)}</div>
    </>
  )
}
