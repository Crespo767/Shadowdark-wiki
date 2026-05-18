import { kaelVoss } from './kael-voss'
import type { Player } from '../../types/player'

export const allPlayers: Player[] = [kaelVoss]
export const getPlayerById = (id: string) => allPlayers.find((p) => p.id === id)
