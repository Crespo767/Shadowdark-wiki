import { umbrath } from './umbrath'
import type { Location } from '../../types/location'

export const allLocations: Location[] = [umbrath]
export const getLocationById = (id: string) => allLocations.find((l) => l.id === id)
