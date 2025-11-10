import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { useDate } from './useDate'
import { isAfter, isBefore } from 'date-fns'
import { defaultDate, maxDate } from '@/lib/constants'

export function DateSelector() {
  const { date, setDate, prevMonth, nextMonth } = useDate()

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => prevMonth()}
        className="cursor-pointer"
        disabled={!isAfter(date, defaultDate)}
      >
        <ChevronLeft />
      </Button>
      <DatePicker date={date} onChange={setDate} />
      <Button
        variant="outline"
        onClick={() => nextMonth()}
        className="cursor-pointer"
        disabled={!isBefore(date, maxDate)}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
