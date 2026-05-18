import { marenThresh } from './maren-thresh'
import type { NPC } from '../../types/npc'

export const allNpcs: NPC[] = [marenThresh]
export const getNpcById = (id: string) => allNpcs.find((n) => n.id === id)
