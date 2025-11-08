import { Position, Role } from '@/server/pocketbase-types'

export const positionPriority: Position[] = [
  'ST',
  'CF',
  'LW',
  'RW',
  'LM',
  'RM',
  'CAM',
  'CDM',
  'CM',
  'RB',
  'LB',
  'RWB',
  'LWB',
  'CB',
  'GK',
]

export const rolePriority: Role[] = [
  'Crucial',
  'Important',
  'Rotation',
  'Sporadic',
  'Future',
  'Prospect',
]
