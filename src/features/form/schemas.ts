import { z } from 'zod'

export const teamSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  season: z.string().min(1, { message: 'Season is required' }),
  active: z.boolean().default(false),
})
