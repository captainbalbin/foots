import { ColumnDef } from '@tanstack/react-table'
import { Player, Position, Role } from '@/lib/types'
import { positionPriority, rolePriority } from './column-priorities'
import {
  // ChangeCell,
  CurrencyCell,
  // CurrencyChangeCell,
  EditableCell,
  LinkCell,
  RatingCell,
} from './cells'

type PlayerColumnDef = ColumnDef<Player> & {
  accessorKey: keyof Player
}

export const columns: PlayerColumnDef[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'kit_number',
    header: 'Kit Number',
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    cell: ({ row }) => {
      const firstName: string = row.getValue('first_name')
      const id: string = row.getValue('id')

      return <LinkCell name={firstName} id={id} type="player" />
    },
    size: 150,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    cell: ({ row }) => {
      const lastName: string = row.getValue('last_name')
      const id: string = row.getValue('id')

      return <LinkCell name={lastName} id={id} type="player" />
    },
    size: 150,
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => {
      const position: Position[] = row.getValue('position')

      return position?.join('/') || null
    },
    size: 100,
    sortingFn: (rowA, rowB) => {
      const positionA: Position[] = rowA.getValue('position')
      const positionB: Position[] = rowB.getValue('position')

      const indexA = positionPriority.indexOf(positionA[0])
      const indexB = positionPriority.indexOf(positionB[0])

      return indexA - indexB
    },
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: ({ row }) => {
      const age: string = row.getValue('age')
      const id: string = row.getValue('id')

      return (
        <EditableCell rowId={id} displayValue={age}>
          <div>{age}</div>
        </EditableCell>
      )
    },
  },
  {
    accessorKey: 'rating_current',
    header: 'Current Rating',
    cell: ({ row }) => {
      const currentRating: number = row.getValue('rating_current')

      return <RatingCell rating={currentRating} />
    },
    size: 100,
  },
  {
    accessorKey: 'rating_base',
    header: 'Base Rating',
    cell: ({ row }) => {
      const baseRating: number = row.getValue('rating_base')

      return (
        <EditableCell rowId={row.getValue('id')} displayValue={baseRating}>
          <RatingCell rating={baseRating} />
        </EditableCell>
      )
    },
    size: 100,
  },
  // {
  //   accessorKey: 'rating_change',
  //   header: 'Rating Change',
  //   cell: ({ row }) => {
  //     const baseRating: number = row.getValue('base_rating')
  //     const currentRating: number = row.getValue('current_rating')
  //     const ratingChange = currentRating - baseRating
  //     return <ChangeCell value={ratingChange} />
  //   },
  //   size: 100,
  // },
  {
    accessorKey: 'rating_potential',
    header: 'Potential Rating',
    cell: ({ row }) => {
      const potentialRating: number = row.getValue('rating_potential')

      return <RatingCell rating={potentialRating} />
    },
    size: 100,
  },
  {
    accessorKey: 'contract_role',
    header: 'Contract Role',
    sortingFn: (rowA, rowB) => {
      const roleA: Role = rowA.getValue('contract_role')
      const roleB: Role = rowB.getValue('contract_role')

      const indexA = rolePriority.indexOf(roleA)
      const indexB = rolePriority.indexOf(roleB)

      return indexA - indexB
    },
  },
  {
    accessorKey: 'contract_length',
    header: 'Contract Length',
    cell: ({ row }) => {
      const contractLength: number = row.getValue('contract_length')

      const yearsString = `${contractLength} year${contractLength > 1 ? 's' : ''}`
      const monthsString = `${contractLength * 10} month${contractLength * 10 > 1 ? 's' : ''}`

      return <span>{contractLength >= 1 ? yearsString : monthsString}</span>
    },
  },
  {
    accessorKey: 'wage_current',
    header: 'Salary',
    cell: ({ row }) => {
      const salary: number = row.getValue('wage_current')

      return <CurrencyCell value={salary} />
    },
  },
  {
    accessorKey: 'market_value_base',
    header: 'Base Market Value',
    cell: ({ row }) => {
      const baseMarketValue: number = row.getValue('market_value_base')

      return <CurrencyCell value={baseMarketValue} />
    },
  },
  {
    accessorKey: 'market_value_current',
    header: 'Current Market Value',
    cell: ({ row }) => {
      const currentMarketValue: number = row.getValue('market_value_current')

      return <CurrencyCell value={currentMarketValue} />
    },
  },
  // {
  //   accessorKey: 'market_value_change',
  //   header: 'Market Value Change',
  //   cell: ({ row }) => {
  //     const baseMarketValue: number = row.getValue('base_market_value')
  //     const currentMarketValue: number = row.getValue('current_market_value')

  //     return (
  //       <CurrencyChangeCell
  //         base={baseMarketValue}
  //         current={currentMarketValue}
  //       />
  //     )
  //   },
  // },
  {
    accessorKey: 'release_clause',
    header: 'Release Clause',
    cell: ({ row }) => {
      const releaseClause: number = row.getValue('release_clause')

      return <CurrencyCell value={releaseClause} />
    },
  },
  {
    accessorKey: 'on_loan',
    header: 'On Loan',
    cell: ({ row }) => {
      const loanedOut: { id: string; name: string } = row.getValue('on_loan')

      return <LinkCell name={loanedOut.name} id={loanedOut.id} type="team" />
    },
  },
  // {
  //   accessorKey: 'loaned_in',
  //   header: 'Loaned In',
  //   cell: ({ row }) => {
  //     const loanedIn: boolean = row.getValue('loaned_in')

  //     return <BooleanCell value={loanedIn} />
  //   },
  // },
]
