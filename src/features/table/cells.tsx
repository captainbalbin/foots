import colors from 'tailwindcss/colors'
import chroma from 'chroma-js'

export const RatingCell = ({ rating }: { rating: number }) => {
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

  const backgroundColor = getRatingColor(rating)
  const textColor =
    chroma.contrast(backgroundColor, 'white') >= 4.5
      ? 'text-white'
      : 'text-black'

  return (
    <span style={{ backgroundColor }} className={`${textColor} p-1 rounded`}>
      {rating}
    </span>
  )
}
