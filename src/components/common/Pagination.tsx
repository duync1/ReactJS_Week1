import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPages = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`mx-1 px-3 py-1 rounded cursor-pointer ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50'}`}
        >
          {i}
        </button>
      )
    }
    return pages
  }

  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-white border border-blue-300 text-blue-600 disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>
      {renderPages()}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-white border border-blue-300 text-blue-600 disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
