import { useLocation, useNavigate } from 'react-router'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      icon: '📦',
      label: 'Products',
      path: '/admin/products',
      description: 'Manage products',
    },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        height: 'calc(100vh - 64px)',
        position: 'sticky',
        top: '64px',
        overflowY: 'auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          padding: '1.5rem 1rem',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <h2
          style={{
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#9ca3af',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
          }}
        >
          Main Menu
        </h2>
      </div>

      {/* Menu Items */}
      <nav style={{ padding: '1rem' }}>
        {menuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1rem',
                marginBottom: '0.5rem',
                border: 'none',
                borderRadius: '0.5rem',
                backgroundColor: active ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
                position: 'relative',
              }}
              onMouseOver={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                }
              }}
              onMouseOut={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {/* Active Indicator */}
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '70%',
                    backgroundColor: '#3b82f6',
                    borderRadius: '0 0.25rem 0.25rem 0',
                  }}
                />
              )}

              {/* Icon */}
              <div
                style={{
                  fontSize: '1.5rem',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active ? '#dbeafe' : '#f3f4f6',
                  borderRadius: '0.375rem',
                  transition: 'all 0.2s',
                }}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: active ? '700' : '600',
                    color: active ? '#1e40af' : '#374151',
                    marginBottom: '0.125rem',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                  }}
                >
                  {item.description}
                </div>
              </div>

              {/* Arrow */}
              {active && (
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#3b82f6',
                  }}
                >
                  ▶
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
        }}
      >
        <div
          style={{
            backgroundColor: '#eff6ff',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid #dbeafe',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '0.25rem',
            }}
          >
            Need Help?
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            Check our documentation for more information
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
