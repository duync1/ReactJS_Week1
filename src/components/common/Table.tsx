/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (item: T, index: number) => ReactNode
  hidden?: boolean
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
  emptyMessage?: string
  emptyIcon?: string
  onRowClick?: (item: T) => void
}

const Table = <T,>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No data available',
  emptyIcon = '📋',
  onRowClick,
}: TableProps<T>) => {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-16 text-center">
        <div className="text-6xl mb-4">{emptyIcon}</div>
        <div className="text-gray-400 text-lg">{emptyMessage}</div>
      </div>
    )
  }
  const visibleColumns = columns.filter((column) => !column.hidden)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider ${
                    column.align === 'center'
                      ? 'text-center'
                      : column.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                  }`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-gray-200 transition-all duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 hover:shadow-md ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {visibleColumns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-4 ${
                      column.align === 'center'
                        ? 'text-center'
                        : column.align === 'right'
                          ? 'text-right'
                          : 'text-left'
                    }`}
                  >
                    {column.render
                      ? column.render(item, index)
                      : String((item as any)[column.key] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with count */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-300 text-sm text-gray-600 text-center font-medium">
        Showing <strong className="text-blue-600">{data.length}</strong> item
        {data.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default Table
