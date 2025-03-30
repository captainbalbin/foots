import { ColumnDef } from '@tanstack/react-table'
import { Player } from '@/features/players/types'
import {
  BooleanCell,
  ChangeCell,
  CurrencyCell,
  CurrencyChangeCell,
  EditableCell,
  LinkCell,
  RatingCell,
} from './cells'

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'shirt_number',
    header: 'Shirt Number',
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    cell: ({ row }) => {
      const firstName: string = row.getValue('first_name')

      return (
        <LinkCell name={firstName} path={`/players/${row.getValue('id')}`} />
      )
    },
    size: 150,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    cell: ({ row }) => {
      const lastName: string = row.getValue('last_name')

      return (
        <LinkCell name={lastName} path={`/players/${row.getValue('id')}`} />
      )
    },
    size: 150,
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => {
      const position: string[] = row.getValue('position')

      return position?.join('/') || null
    },
    size: 100,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: ({ row }) => {
      const age: string = row.getValue('age')
      const id: number = row.getValue('id')

      return <EditableCell rowId={id} displayValue={age} />
    },
  },
  {
    accessorKey: 'current_rating',
    header: 'Current Rating',
    cell: ({ row }) => {
      const currentRating: number = row.getValue('current_rating')

      return <RatingCell rating={currentRating} />
    },
    size: 100,
  },
  {
    accessorKey: 'base_rating',
    header: 'Base Rating',
    cell: ({ row }) => {
      const baseRating: number = row.getValue('base_rating')

      return <RatingCell rating={baseRating} />
    },
    size: 100,
  },
  {
    accessorKey: 'rating_change',
    header: 'Rating Change',
    cell: ({ row }) => {
      const baseRating: number = row.getValue('base_rating')
      const currentRating: number = row.getValue('current_rating')
      const ratingChange = currentRating - baseRating
      return <ChangeCell value={ratingChange} />
    },
    size: 100,
  },
  {
    accessorKey: 'potential_rating',
    header: 'Potential Rating',
    cell: ({ row }) => {
      const potentialRating: number = row.getValue('potential_rating')

      return <RatingCell rating={potentialRating} />
    },
    size: 100,
  },
  {
    accessorKey: 'contract_role',
    header: 'Contract Role',
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
    accessorKey: 'salary',
    header: 'Salary',
    cell: ({ row }) => {
      const salary: number = row.getValue('salary')

      return <CurrencyCell value={salary} />
    },
  },
  {
    accessorKey: 'base_market_value',
    header: 'Base Market Value',
    cell: ({ row }) => {
      const baseMarketValue: number = row.getValue('base_market_value')

      return <CurrencyCell value={baseMarketValue} />
    },
  },
  {
    accessorKey: 'current_market_value',
    header: 'Current Market Value',
    cell: ({ row }) => {
      const currentMarketValue: number = row.getValue('current_market_value')

      return <CurrencyCell value={currentMarketValue} />
    },
  },
  {
    accessorKey: 'market_value_change',
    header: 'Market Value Change',
    cell: ({ row }) => {
      const baseMarketValue: number = row.getValue('base_market_value')
      const currentMarketValue: number = row.getValue('current_market_value')

      return (
        <CurrencyChangeCell
          base={baseMarketValue}
          current={currentMarketValue}
        />
      )
    },
  },
  {
    accessorKey: 'release_clause',
    header: 'Release Clause',
    cell: ({ row }) => {
      const releaseClause: number = row.getValue('release_clause')

      return <CurrencyCell value={releaseClause} />
    },
  },
  {
    accessorKey: 'loaned_out',
    header: 'Loaned Out',
    cell: ({ row }) => {
      const loanedOut: boolean = row.getValue('loaned_out')

      return <BooleanCell value={loanedOut} />
    },
  },
  {
    accessorKey: 'loaned_in',
    header: 'Loaned In',
    cell: ({ row }) => {
      const loanedIn: boolean = row.getValue('loaned_in')

      return <BooleanCell value={loanedIn} />
    },
  },
]
