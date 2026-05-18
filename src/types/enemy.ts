export type EnemyType =
  | 'criatura'
  | 'humanoide'
  | 'morto-vivo'
  | 'demônio'
  | 'chefe'
  | 'outro'

export type EnemyThreat = 'baixa' | 'média' | 'alta' | 'letal'
export type EnemyOutcome = 'derrotado' | 'fugiu' | 'recorrente' | 'aliado' | 'ativo'

export interface Enemy {
  id: string
  name: string
  type: EnemyType
  threat: EnemyThreat
  image?: string
  description: string
  tactics?: string
  outcome: EnemyOutcome
  loot?: string[]
  sessionIds: string[]
}
