/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'

import { type Product } from '../../types/Product'
import type { CreateProductDTO } from '../../types/dto/CreateProductDTO'

interface AddOrUpdateProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: CreateProductDTO) => void
  product?: Product | null
}

const AddOrUpdateProductModal = ({
  isOpen,
  onClose,
  onSave,
  product,
}: AddOrUpdateProductModalProps) => {
  const [formData, setFormData] = useState<CreateProductDTO>({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: typeof product.price === 'number' ? product.price : 0,
        quantity: typeof product.quantity === 'number' ? product.quantity : 0,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
      })
    }
    setErrors({})
  }, [product, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
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

    const productData: CreateProductDTO = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      quantity: formData.quantity,
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
      {/* Backdrop with Flexbox Center */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-sm text-gray-600">
                {product
                  ? 'Update product information'
                  : 'Fill in the details to add a new product'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter product description"
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all resize-y shadow-sm hover:shadow-md ${
                    errors.description
                      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.description}
                  </p>
                )}
              </div>

              {/* Price and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                      errors.price
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  />
                  {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                      errors.quantity
                        ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                    }`}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 px-6 py-5 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 sticky bottom-0 rounded-b-2xl">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-8 py-3 text-sm font-bold text-white rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all ${
                  product
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                }`}
              >
                {product ? '💾 Update Product' : '➕ Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddOrUpdateProductModal
