import { useState } from 'react'
import { getPlayers } from '../store/campaignStore'
import { PlayerCard } from '../components/cards/PlayerCard'

export function PlayersPage() {
  const [filter, setFilter] = useState('todos')
  const players = getPlayers()
  const filtered = filter === 'todos' ? players : players.filter((player) => String(player.alive) === filter)
  return (
    <>
      <h1 className="pageTitle">Jogadores</h1>
      <p className="pageLead">{filtered.length} fichas encontradas</p>
      <div className="filterBar">{['todos', 'true', 'false'].map((option) => <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>{option === 'true' ? 'vivos' : option === 'false' ? 'mortos' : option}</button>)}</div>
      <div className="grid">{filtered.map((player) => <PlayerCard key={player.id} player={player} />)}</div>
    </>
  )
}
