export interface Player {
  id: string
  playerName: string
  characterName: string
  race: string
  class: string
  level: number
  portrait?: string
  background: string
  inventory: string[]
  bonds: string[]
  alive: boolean
  deathNote?: string
  sessionIds: string[]
}
