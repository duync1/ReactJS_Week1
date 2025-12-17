import { useState } from 'react'
import { useNavigate } from 'react-router'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateFullName = (name: string) => {
    if (!name) {
      return 'Full name is required'
    }
    if (name.length < 3) {
      return 'Full name must be at least 3 characters'
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Full name can only contain letters and spaces'
    }
    return ''
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return 'Email is required'
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number'
    }
    return ''
  }

  const validateConfirmPassword = (confirmPassword: string, password: string) => {
    if (!confirmPassword) {
      return 'Please confirm your password'
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match'
    }
    return ''
  }

  const handleInputChange = (
    field: 'fullName' | 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user types
    setErrors({ ...errors, [field]: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const fullNameError = validateFullName(formData.fullName)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    )

    if (fullNameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        fullName: fullNameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Registration successful:', formData)
      alert('Registration successful! Please login.')
      setIsSubmitting(false)
      // Navigate to login page
      navigate('/login')
    }, 1000)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          padding: '3rem',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}
          >
            📝
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.5rem 0',
            }}
          >
            Create Account
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>Sign up to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: errors.fullName ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!errors.fullName) {
                  e.currentTarget.style.borderColor = '#3b82f6'
                }
              }}
              onBlur={(e) => {
                if (!errors.fullName) {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
                const error = validateFullName(formData.fullName)
                if (error) {
                  setErrors({ ...errors, fullName: error })
                }
              }}
            />
            {errors.fullName && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}
              >
                ⚠️ {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@email.com"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.currentTarget.style.borderColor = '#3b82f6'
                }
              }}
              onBlur={(e) => {
                if (!errors.email) {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
                const error = validateEmail(formData.email)
                if (error) {
                  setErrors({ ...errors, email: error })
                }
              }}
            />
            {errors.email && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}
              >
                ⚠️ {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create a strong password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.currentTarget.style.borderColor = '#3b82f6'
                }
              }}
              onBlur={(e) => {
                if (!errors.password) {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
                const error = validatePassword(formData.password)
                if (error) {
                  setErrors({ ...errors, password: error })
                }
              }}
            />
            {errors.password && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}
              >
                ⚠️ {errors.password}
              </p>
            )}
            {!errors.password && formData.password && (
              <p
                style={{
                  color: '#6b7280',
                  fontSize: '0.75rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}
              >
                Must contain: 8+ chars, uppercase, lowercase, number
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Re-enter your password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: errors.confirmPassword ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                if (!errors.confirmPassword) {
                  e.currentTarget.style.borderColor = '#3b82f6'
                }
              }}
              onBlur={(e) => {
                if (!errors.confirmPassword) {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                }
                const error = validateConfirmPassword(formData.confirmPassword, formData.password)
                if (error) {
                  setErrors({ ...errors, confirmPassword: error })
                }
              }}
            />
            {errors.confirmPassword && (
              <p
                style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  marginBottom: 0,
                }}
              >
                ⚠️ {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
              color: 'white',
              padding: '0.875rem',
              fontSize: '1rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
              marginTop: '0.5rem',
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#059669'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#10b981'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '2rem 0',
          }}
        >
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          <span style={{ padding: '0 1rem', color: '#9ca3af', fontSize: '0.875rem' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
        </div>

        {/* Login Link */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>Already have an account? </span>
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
            style={{
              color: '#3b82f6',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.95rem',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
