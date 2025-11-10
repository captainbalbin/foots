import { defaultDate } from '@/lib/constants'
import { addMonths, subMonths } from 'date-fns'
import { StateCreator } from 'zustand'

export interface DateSlice {
  date: Date
  setDate: (newDate: Date) => void
  prevMonth: () => void
  nextMonth: () => void
}

export const createDateSlice: StateCreator<DateSlice> = (set) => ({
  date: defaultDate,
  setDate: (newDate: Date) => set({ date: newDate }),
  prevMonth: () => set((state) => ({ date: subMonths(state.date, 1) })),
  nextMonth: () => set((state) => ({ date: addMonths(state.date, 1) })),
})
