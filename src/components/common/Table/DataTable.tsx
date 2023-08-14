import { Skeleton } from '@mui/lab'
import { Table, TableCell, TableRow, TableBody } from '@mui/material'

export interface DataTableColumn<T = any> {
  header?: any
  render: (row: T) => any
  align?: 'left' | 'right' | 'center'
}

interface DataTableProp<T = any> {
  columns: DataTableColumn<T>[]
  rows: T[]
  loading?: boolean
  className?: string
}

const DataTable = ({ columns, rows, loading = false, className = '' }: DataTableProp) => {
  return (
    <>
      <Table
        className={className}
        sx={{
          td: {
            padding: {
              xs: '4px 8px',
              lg: '4px 16px',
            },
          },
        }}
      >
        <thead className="select-none">
          <TableRow>
            {columns.map((col, i) => (
              <TableCell sx={{ fontWeight: 600, textAlign: col.align || 'left' }} key={i}>
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </thead>
        <TableBody>
          {loading &&
            [...new Array(10)].map((item, i) => (
              <TableRow key={i}>
                <TableCell colSpan={9}>
                  <Skeleton variant="rectangular" height={30} width="100%" />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            rows?.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col, j) => (
                  <TableCell sx={{ textAlign: col.align || 'left' }} className="">
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

export default DataTable
