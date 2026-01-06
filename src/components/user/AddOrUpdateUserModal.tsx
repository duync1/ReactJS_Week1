import { useState, useEffect } from 'react'

import { type User } from '../../types/User'
import type { CreateUserDTO } from '../../types/dto/CreateUserDTO'

interface AddOrUpdateUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (user: CreateUserDTO) => void
  user?: User | null
}

const AddOrUpdateUserModal = ({ isOpen, onClose, onSave, user }: AddOrUpdateUserModalProps) => {
  const getInitialFormData = (): CreateUserDTO => {
    if (user) {
      return {
        email: user.email || '',
        password: '', // Password will be optional for update
        fullName: user.fullName || '',
        role: user.role || 'user',
      }
    }
    return {
      email: '',
      password: '',
      fullName: '',
      role: 'user',
    }
  }

  const [formData, setFormData] = useState<CreateUserDTO>(getInitialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isMouseDownOnBackdrop, setIsMouseDownOnBackdrop] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData())
      setErrors({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, user?.id])

  // Close modal on ESC key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleBackdropMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMouseDownOnBackdrop(true)
    }
  }

  const handleBackdropMouseUp = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isMouseDownOnBackdrop) {
      onClose()
    }
    setIsMouseDownOnBackdrop(false)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!user && !formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.trim() && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const userData: CreateUserDTO = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role,
    }

    onSave(userData)
    onClose()
  }

  const handleChange = (field: keyof CreateUserDTO, value: string) => {
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
        onMouseDown={handleBackdropMouseDown}
        onMouseUp={handleBackdropMouseUp}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-2xl shadow-2xl w-full sm:w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user ? 'Edit User' : 'Add New User'}
              </h2>
              <p className="text-sm text-gray-600">
                {user ? 'Update user information' : 'Fill in the details to add a new user'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
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
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  disabled={!!user}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                    user ? 'bg-gray-100 cursor-not-allowed' : ''
                  } ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Password (optional when editing) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password {!user && <span className="text-red-500">*</span>}
                  {user && (
                    <span className="text-xs text-gray-500 ml-2">(leave blank to keep)</span>
                  )}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder={
                    user
                      ? 'Leave blank to keep current password'
                      : 'Enter password (min 6 characters)'
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                  className={`w-full px-4 py-3 border-2 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md ${
                    errors.fullName
                      ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none transition-all shadow-sm hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 px-6 py-5 border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 sticky bottom-0 rounded-b-2xl">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-8 py-3 text-sm font-bold text-white rounded-xl shadow-lg hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 transition-all cursor-pointer ${
                  user
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
                }`}
              >
                {user ? '💾 Update User' : '➕ Add User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddOrUpdateUserModal
