/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

import { type Product } from '../../types/Product'

interface AddOrUpdateProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  product?: Product | null
}

const AddOrUpdateProductModal = ({
  isOpen,
  onClose,
  onSave,
  product,
}: AddOrUpdateProductModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        price: 0,
        quantity: 0,
      })
    }
    setErrors({})
  }, [product, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0'
    }
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const productData: Product = {
      id: product?.id || Date.now(),
      ...formData,
    }

    onSave(productData)
    onClose()
  }

  const handleChange = (field: keyof Omit<Product, 'id'>, value: string | number) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  if (!isOpen) return null

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
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          animation: 'slideIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 0.25rem 0',
              }}
            >
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              {product ? 'Update product information' : 'Fill in the details to add a new product'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '0.25rem',
              borderRadius: '0.375rem',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6'
              e.currentTarget.style.color = '#1f2937'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#9ca3af'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '1.5rem' }}>
            {/* Title */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Product Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter product title"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: errors.title ? '2px solid #ef4444' : '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  if (!errors.title) e.currentTarget.style.borderColor = '#3b82f6'
                }}
                onBlur={(e) => {
                  if (!errors.title) e.currentTarget.style.borderColor = '#e5e7eb'
                }}
              />
              {errors.title && (
                <p
                  style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginBottom: 0,
                  }}
                >
                  ⚠️ {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem',
                }}
              >
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: errors.description ? '2px solid #ef4444' : '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => {
                  if (!errors.description) e.currentTarget.style.borderColor = '#3b82f6'
                }}
                onBlur={(e) => {
                  if (!errors.description) e.currentTarget.style.borderColor = '#e5e7eb'
                }}
              />
              {errors.description && (
                <p
                  style={{
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    marginTop: '0.5rem',
                    marginBottom: 0,
                  }}
                >
                  ⚠️ {errors.description}
                </p>
              )}
            </div>

            {/* Price and Quantity in a row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              {/* Price */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.price ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.price) e.currentTarget.style.borderColor = '#3b82f6'
                  }}
                  onBlur={(e) => {
                    if (!errors.price) e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                />
                {errors.price && (
                  <p
                    style={{
                      color: '#ef4444',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      marginBottom: 0,
                    }}
                  >
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  Quantity *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: errors.quantity ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (!errors.quantity) e.currentTarget.style.borderColor = '#3b82f6'
                  }}
                  onBlur={(e) => {
                    if (!errors.quantity) e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                />
                {errors.quantity && (
                  <p
                    style={{
                      color: '#ef4444',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      marginBottom: 0,
                    }}
                  >
                    {errors.quantity}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              backgroundColor: '#f9fafb',
            }}
          >
            <button
              type="button"
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
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '700',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: product ? '#f59e0b' : '#10b981',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = product ? '#d97706' : '#059669'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = product ? '#f59e0b' : '#10b981'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {product ? '💾 Update Product' : '➕ Add Product'}
            </button>
          </div>
        </form>

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

export default AddOrUpdateProductModal
