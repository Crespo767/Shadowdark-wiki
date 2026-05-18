export type LocationType =
  | 'cidade'
  | 'dungeon'
  | 'ruína'
  | 'floresta'
  | 'torre'
  | 'taverna'
  | 'templo'
  | 'outro'

export type LocationStatus = 'explorado' | 'parcial' | 'desconhecido'

export interface Location {
  id: string
  name: string
  type: LocationType
  status: LocationStatus
  mapImage?: string
  images?: string[]
  description: string
  atmosphere?: string
  notableNpcIds?: string[]
  sessionIds: string[]
  dangerLevel?: 'seguro' | 'arriscado' | 'mortal'
}
