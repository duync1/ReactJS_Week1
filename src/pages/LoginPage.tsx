import { useState } from 'react'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (password.length < 6) {
      return 'Password must be at least 6 characters'
    }
    return ''
  }

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user types
    setErrors({ ...errors, [field]: '' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      console.log('Login successful:', formData)
      alert('Login successful!')
      setIsSubmitting(false)
      // Navigate to products page
      navigate('/products')
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
          maxWidth: '450px',
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
            🔐
          </div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.5rem 0',
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: 0 }}>
            Please login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <a
              href="#"
              style={{
                color: '#3b82f6',
                fontSize: '0.875rem',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.875rem',
              fontSize: '1rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#2563eb'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
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

        {/* Register Link */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>Don't have an account? </span>
          <a
            href="/register"
            onClick={(e) => {
              e.preventDefault()
              navigate('/register')
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
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
