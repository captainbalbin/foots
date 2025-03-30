import colors from 'tailwindcss/colors'
import chroma from 'chroma-js'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useUpdatePlayer } from '../players/useUpdatePlayer'
import { Input } from '@/components/ui/input'

const getRatingColor = (r: number) => {
  switch (true) {
    case r >= 90:
      return colors.violet[800]
    case r >= 80:
      return colors.green[900]
    case r >= 70:
      return colors.green[600]
    case r >= 60:
      return colors.yellow[500]
    case r >= 50:
      return colors.orange[500]
    default:
      return colors.red[700]
  }
}

const getTextContrastColor = (backgroundColor: string) => {
  return chroma.contrast(backgroundColor, 'white') >= 4.5
    ? 'text-white'
    : 'text-black'
}

const getChangeBackgroundColor = (v: number) => {
  return v > 0 ? colors.green[600] : v < 0 ? colors.red[600] : colors.gray[400]
}

export const RatingCell = ({ rating }: { rating: number }) => {
  const backgroundColor = getRatingColor(rating)
  const textColor = getTextContrastColor(backgroundColor)

  return (
    <span style={{ backgroundColor }} className={`${textColor} p-1 rounded`}>
      {rating}
    </span>
  )
}

export const ChangeCell = ({ value }: { value: number }) => {
  const backgroundColor = getChangeBackgroundColor(value)
  const textColor = getTextContrastColor(backgroundColor)

  return (
    <span
      style={{ backgroundColor: backgroundColor }}
      className={`${textColor} p-1 rounded`}
    >
      {value === 0 ? '-' : value > 0 ? `+${value}` : value}
    </span>
  )
}

export const CurrencyCell = ({ value }: { value?: number }) => {
  if (!value) {
    return null
  }

  return <span>€{value.toLocaleString()}</span>
}

export const CurrencyChangeCell = ({
  base,
  current,
}: {
  base: number
  current: number
}) => {
  const value = current - base
  const backgroundColor = getChangeBackgroundColor(value)
  const textColor = getTextContrastColor(backgroundColor)

  return (
    <span style={{ backgroundColor }} className={`${textColor} p-1 rounded`}>
      {value === 0
        ? '-'
        : value > 0
          ? `+€${value.toLocaleString()}`
          : `-€${Math.abs(value).toLocaleString()}`}
    </span>
  )
}

export const BooleanCell = ({ value }: { value: boolean }) => {
  return <span>{value ? 'Yes' : 'No'}</span>
}

export const LinkCell = ({ path, name }: { path: string; name: string }) => {
  return (
    <Link to="/players/$playerId" params={{ playerId: path }}>
      {name}
    </Link>
  )
}

export const EditableCell = ({
  rowId,
  displayValue,
}: {
  rowId: number
  displayValue: string
}) => {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState<string>(displayValue)
  const { updatePlayer, updatePlayerLoading } = useUpdatePlayer()

  const handleInput = () => {
    if (!rowId) {
      setActive(false)
      return
    }

    updatePlayer({
      id: rowId,
      player: {
        age: Number(value),
      },
    })

    setActive(false)
  }

  if (!active) {
    return <span onDoubleClick={() => setActive(true)}>{displayValue}</span>
  }

  if (updatePlayerLoading) {
    return <span>Loading...</span>
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleInput()
        } else if (e.key === 'Escape') {
          setActive(false)
        }
      }}
      onFocus={(e) => e.target.select()}
      onBlur={() => setActive(false)}
      enterKeyHint="done"
      autoFocus
    />
  )
}
