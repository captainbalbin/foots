import { create } from 'zustand'
import { createDateSlice, DateSlice } from './dateSlice'

export const useStore = create<DateSlice>()((...a) => ({
  ...createDateSlice(...a),
}))
