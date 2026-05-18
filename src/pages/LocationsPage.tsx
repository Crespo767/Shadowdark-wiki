import { useState } from 'react'
import { getLocations } from '../store/campaignStore'
import { LocationCard } from '../components/cards/LocationCard'

export function LocationsPage() {
  const [filter, setFilter] = useState('todos')
  const locations = getLocations()
  const filtered = filter === 'todos' ? locations : locations.filter((location) => location.type === filter || location.status === filter || location.dangerLevel === filter)
  const options = ['todos', 'cidade', 'dungeon', 'ruína', 'floresta', 'torre', 'taverna', 'templo', 'explorado', 'parcial', 'desconhecido', 'seguro', 'arriscado', 'mortal']
  return (
    <>
      <h1 className="pageTitle">Locais</h1>
      <p className="pageLead">{filtered.length} locais encontrados</p>
      <div className="filterBar">{options.map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option}</button>)}</div>
      <div className="grid">{filtered.map((location) => <LocationCard key={location.id} location={location} />)}</div>
    </>
  )
}
