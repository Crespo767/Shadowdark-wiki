import { session01 } from './session-01'
import type { Session } from '../../types/session'

export const allSessions: Session[] = [session01]
export const getSessionById = (id: string) => allSessions.find((s) => s.id === id)
