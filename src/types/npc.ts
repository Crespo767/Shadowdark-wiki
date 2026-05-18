export type NpcStatus = 'alive' | 'dead' | 'unknown' | 'missing'
export type NpcDisposition = 'aliado' | 'neutro' | 'hostil' | 'desconhecido'

export interface NPC {
  id: string
  name: string
  role: string
  faction?: string
  status: NpcStatus
  disposition: NpcDisposition
  portrait?: string
  description: string
  masterNotes?: string
  sessionIds: string[]
  locationIds?: string[]
}
