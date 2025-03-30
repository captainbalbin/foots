import { ColumnDef } from '@tanstack/react-table'
import { Player } from '@/features/players/types'
import { RatingCell } from './cells'

export const columns: ColumnDef<Player>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 50,
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    size: 150,
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    size: 150,
  },
  //   {
  //     accessorKey: 'team',
  //     header: 'Team',
  //     size: 150,
  //   },
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
    size: 50,
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
    accessorKey: 'potential_rating',
    header: 'Potential Rating',
    cell: ({ row }) => {
      const potentialRating: number = row.getValue('potential_rating')

      return <RatingCell rating={potentialRating} />
    },
    size: 100,
  },
]
