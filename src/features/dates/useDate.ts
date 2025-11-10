import { isSameDay, isAfter, isBefore } from 'date-fns'
import { useStore } from '@/store/useStore'
import { defaultDate, maxDate } from '@/lib/constants'

export const useDate = () => {
  const { date, setDate, prevMonth, nextMonth } = useStore()

  function handleSetDate(newDate: Date) {
    if (!isSameDay(date, newDate)) {
      setDate(newDate)
    }
  }

  function handlePrevMonth() {
    if (isAfter(date, defaultDate)) {
      prevMonth()
    }
  }

  function handleNextMonth() {
    if (isBefore(date, maxDate)) {
      nextMonth()
    }
  }

  return {
    date,
    setDate: handleSetDate,
    prevMonth: handlePrevMonth,
    nextMonth: handleNextMonth,
  }
}
