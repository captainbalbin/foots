import { useQueryClient } from '@tanstack/react-query'
import { teamsQueryOptions } from '../teams/queries'
import { subMonths, addMonths, isSameMonth } from 'date-fns'
import { useState } from 'react'

export const useDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2023-05-05'))

  const queryClient = useQueryClient()

  function handleUpdate(newDate: Date) {
    if (!isSameMonth(currentDate, newDate)) {
      setCurrentDate(newDate)
      queryClient.invalidateQueries({ queryKey: teamsQueryOptions.queryKey })
    }
  }

  function handlePrev() {
    const prevMonthDate = subMonths(currentDate, 1)

    setCurrentDate(prevMonthDate)
  }

  function handleNext() {
    const nextMonthDate = addMonths(currentDate, 1)

    setCurrentDate(nextMonthDate)
  }

  return {
    currentDate,
    updateDate: handleUpdate,
    prevMonth: handlePrev,
    nextMonth: handleNext,
  }
}
