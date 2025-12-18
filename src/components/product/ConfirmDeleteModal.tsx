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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          animation: 'fadeIn 0.2s ease-in-out',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          width: '90%',
          maxWidth: '450px',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          animation: 'slideIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div style={{ padding: '2rem' }}>
          {/* Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            ⚠️
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              textAlign: 'center',
              margin: '0 0 0.75rem 0',
            }}
          >
            Delete Product?
          </h2>

          {/* Description */}
          <p
            style={{
              color: '#6b7280',
              fontSize: '0.95rem',
              textAlign: 'center',
              margin: '0 0 2rem 0',
              lineHeight: '1.5',
            }}
          >
            {itemName ? (
              <>
                Are you sure you want to delete{' '}
                <strong style={{ color: '#1f2937' }}>"{itemName}"</strong>? This action cannot be
                undone.
              </>
            ) : (
              'Are you sure you want to delete this product? This action cannot be undone.'
            )}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                color: '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: '120px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb'
                e.currentTarget.style.borderColor = '#d1d5db'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.borderColor = '#e5e7eb'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: '#ef4444',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                minWidth: '120px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(239, 68, 68, 0.3)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)'
              }}
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
          `}
        </style>
      </div>
    </>
  )
}

export default ConfirmDeleteModal
