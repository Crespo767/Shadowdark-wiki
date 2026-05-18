import { goblinSombras } from './goblin-sombras'
import type { Enemy } from '../../types/enemy'

export const allEnemies: Enemy[] = [goblinSombras]
export const getEnemyById = (id: string) => allEnemies.find((e) => e.id === id)
