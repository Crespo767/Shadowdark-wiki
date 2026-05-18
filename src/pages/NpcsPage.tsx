import { useState } from 'react'
import { getNpcs } from '../store/campaignStore'
import { NpcCard } from '../components/cards/NpcCard'

export function NpcsPage() {
  const [filter, setFilter] = useState('todos')
  const npcs = getNpcs()
  const filtered = filter === 'todos' ? npcs : npcs.filter((npc) => npc.status === filter || npc.disposition === filter)
  const options = ['todos', 'alive', 'dead', 'unknown', 'missing', 'aliado', 'neutro', 'hostil', 'desconhecido']
  return (
    <>
      <h1 className="pageTitle">NPCs</h1>
      <p className="pageLead">{filtered.length} NPCs encontrados</p>
      <div className="filterBar">{options.map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div>
      <div className="grid">{filtered.map((npc) => <NpcCard key={npc.id} npc={npc} />)}</div>
    </>
  )
}
