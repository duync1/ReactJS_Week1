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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-[95%] sm:w-[90%] md:w-[450px] z-[1000] animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center text-4xl">
            ⚠️
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Delete Product?</h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            {itemName ? (
              <>
                Are you sure you want to delete{' '}
                <strong className="text-gray-900">"{itemName}"</strong>? This action cannot be
                undone.
              </>
            ) : (
              'Are you sure you want to delete this product? This action cannot be undone.'
            )}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all min-w-[120px]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 hover:-translate-y-0.5 active:translate-y-0 transition-all min-w-[120px]"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translate(-50%, -48%);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.2s ease-in-out;
            }
            .animate-slideIn {
              animation: slideIn 0.3s ease-out;
            }
          `}
        </style>
      </div>
    </>
  )
}

export default ConfirmDeleteModal
