import type { Session } from '../types/session'
import type { NPC } from '../types/npc'
import type { Player } from '../types/player'
import type { Enemy } from '../types/enemy'
import type { Location } from '../types/location'
import { allSessions } from '../data/sessions'
import { allNpcs } from '../data/npcs'
import { allPlayers } from '../data/players'
import { allEnemies } from '../data/enemies'
import { allLocations } from '../data/locations'

const KEYS = {
  sessions: 'sd_sessions',
  npcs: 'sd_npcs',
  players: 'sd_players',
  enemies: 'sd_enemies',
  locations: 'sd_locations',
  auth: 'sd_auth',
}

function load<T>(key: string, seed: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : seed
  } catch {
    return seed
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export const getSessions = () => load<Session>(KEYS.sessions, allSessions)
export const saveSessions = (s: Session[]) => save(KEYS.sessions, s)
export const upsertSession = (session: Session) => {
  const all = getSessions()
  const idx = all.findIndex((s) => s.id === session.id)
  if (idx >= 0) all[idx] = session
  else all.push(session)
  saveSessions(all)
}
export const deleteSession = (id: string) => saveSessions(getSessions().filter((s) => s.id !== id))

export const getNpcs = () => load<NPC>(KEYS.npcs, allNpcs)
export const saveNpcs = (n: NPC[]) => save(KEYS.npcs, n)
export const upsertNpc = (npc: NPC) => {
  const all = getNpcs()
  const idx = all.findIndex((n) => n.id === npc.id)
  if (idx >= 0) all[idx] = npc
  else all.push(npc)
  saveNpcs(all)
}
export const deleteNpc = (id: string) => saveNpcs(getNpcs().filter((n) => n.id !== id))

export const getPlayers = () => load<Player>(KEYS.players, allPlayers)
export const savePlayers = (p: Player[]) => save(KEYS.players, p)
export const upsertPlayer = (player: Player) => {
  const all = getPlayers()
  const idx = all.findIndex((p) => p.id === player.id)
  if (idx >= 0) all[idx] = player
  else all.push(player)
  savePlayers(all)
}
export const deletePlayer = (id: string) => savePlayers(getPlayers().filter((p) => p.id !== id))

export const getEnemies = () => load<Enemy>(KEYS.enemies, allEnemies)
export const saveEnemies = (e: Enemy[]) => save(KEYS.enemies, e)
export const upsertEnemy = (enemy: Enemy) => {
  const all = getEnemies()
  const idx = all.findIndex((e) => e.id === enemy.id)
  if (idx >= 0) all[idx] = enemy
  else all.push(enemy)
  saveEnemies(all)
}
export const deleteEnemy = (id: string) => saveEnemies(getEnemies().filter((e) => e.id !== id))

export const getLocations = () => load<Location>(KEYS.locations, allLocations)
export const saveLocations = (l: Location[]) => save(KEYS.locations, l)
export const upsertLocation = (loc: Location) => {
  const all = getLocations()
  const idx = all.findIndex((l) => l.id === loc.id)
  if (idx >= 0) all[idx] = loc
  else all.push(loc)
  saveLocations(all)
}
export const deleteLocation = (id: string) => saveLocations(getLocations().filter((l) => l.id !== id))

const ADMIN_PASSWORD = 'shadowdark2025'
export const login = (pw: string) => {
  if (pw === ADMIN_PASSWORD) {
    localStorage.setItem(KEYS.auth, '1')
    return true
  }
  return false
}
export const logout = () => localStorage.removeItem(KEYS.auth)
export const isLoggedIn = () => localStorage.getItem(KEYS.auth) === '1'

export const exportAll = () => {
  const data = {
    sessions: getSessions(),
    npcs: getNpcs(),
    players: getPlayers(),
    enemies: getEnemies(),
    locations: getLocations(),
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `campanha-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export const importAll = (json: string) => {
  const data = JSON.parse(json)
  if (data.sessions) saveSessions(data.sessions)
  if (data.npcs) saveNpcs(data.npcs)
  if (data.players) savePlayers(data.players)
  if (data.enemies) saveEnemies(data.enemies)
  if (data.locations) saveLocations(data.locations)
}
