import { Enums } from '@/server/supabase'

export type Position = Enums<'positions'>
export type Role = Enums<'roles'>

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
