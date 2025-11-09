import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { useDate } from './useDate'

// stateful component for displaying and changing dates.
export function DateSelector() {
  const { currentDate, updateDate, prevMonth, nextMonth } = useDate()

  function handleDatePickerChange(newDate: Date) {
    updateDate(newDate)
  }

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => prevMonth()}
        className="cursor-pointer"
      >
        <ChevronLeft />
      </Button>
      <DatePicker date={currentDate} onChange={handleDatePickerChange} />
      <Button
        variant="outline"
        onClick={() => nextMonth()}
        className="cursor-pointer"
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
