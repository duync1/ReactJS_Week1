interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
}

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }: ConfirmDeleteModalProps) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <>
      {/* Backdrop with Flexbox Center */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[450px] animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Content */}
          <div className="p-8">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-5xl animate-pulse">⚠️</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Delete Product?</h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              {itemName ? (
                <>
                  Are you sure you want to delete{' '}
                  <strong className="text-gray-900 font-bold">"{itemName}"</strong>? This action
                  cannot be undone.
                </>
              ) : (
                'Are you sure you want to delete this product? This action cannot be undone.'
              )}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all min-w-[130px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 hover:-translate-y-0.5 active:translate-y-0 transition-all min-w-[130px] cursor-pointer"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmDeleteModal
