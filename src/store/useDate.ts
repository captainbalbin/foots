import { create } from 'zustand'
import { DEFAULT_DATE, MAX_DATE } from '@/lib/constants'
import { addMonths, isAfter, isBefore, isSameDay, subMonths } from 'date-fns'

type State = {
  date: Date
}

type Action = {
  setDate: (newDate: Date) => void
  prevMonth: () => void
  nextMonth: () => void
}

export const useDate = create<State & Action>((set) => ({
  date: DEFAULT_DATE,
  setDate: (newDate: Date) =>
    set((state) => {
      if (!isSameDay(state.date, newDate)) {
        return { date: newDate }
      }

      return state
    }),
  prevMonth: () =>
    set((state) => {
      if (isAfter(state.date, DEFAULT_DATE)) {
        return { date: subMonths(state.date, 1) }
      }

      return state
    }),
  nextMonth: () =>
    set((state) => {
      if (isBefore(state.date, MAX_DATE)) {
        return { date: addMonths(state.date, 1) }
      }

      return state
    }),
}))
