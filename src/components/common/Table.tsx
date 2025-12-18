/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (item: T, index: number) => ReactNode
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
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{emptyIcon}</div>
        <div style={{ color: '#9ca3af', fontSize: '1.125rem' }}>{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#f9fafb',
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    padding: '1rem',
                    textAlign: column.align || 'left',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    color: '#374151',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: column.width,
                  }}
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
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                  borderBottom: '1px solid #e5e7eb',
                  transition: 'background-color 0.15s',
                  cursor: onRowClick ? 'pointer' : 'default',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb'
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      padding: '1rem',
                      textAlign: column.align || 'left',
                    }}
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
      <div
        style={{
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          fontSize: '0.875rem',
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        Showing <strong style={{ color: '#1f2937' }}>{data.length}</strong> item
        {data.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default Table
