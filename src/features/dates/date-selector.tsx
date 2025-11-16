import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { isAfter, isBefore } from 'date-fns'
import { useDate } from '@/store/useDate'
import { DEFAULT_DATE, MAX_DATE } from '@/lib/constants'

export function DateSelector() {
  const { date, nextMonth, prevMonth, setDate } = useDate()

  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        onClick={() => prevMonth()}
        className="cursor-pointer"
        disabled={!isAfter(date, DEFAULT_DATE)}
      >
        <ChevronLeft />
      </Button>
      <DatePicker date={date} onChange={setDate} />
      <Button
        variant="outline"
        onClick={() => nextMonth()}
        className="cursor-pointer"
        disabled={!isBefore(date, MAX_DATE)}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
