import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'

import type { RootState } from '../../redux/store'

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
    {
      icon: '👥',
      label: 'Users',
      path: '/admin/users',
      description: 'Manage users',
      onlyAdmin: true,
    },
  ]

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const role = useSelector((state: RootState) => state.auth.user.role)

  const visibleMenuItems = menuItems.filter((item) => !item.onlyAdmin || role === 'admin')

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Main Menu</h2>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {visibleMenuItems.map((item) => {
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all relative group ${
                active
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {/* Active Indicator */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
              )}

              {/* Icon */}
              <div
                className={`text-2xl w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                  active
                    ? 'bg-blue-200 shadow-inner'
                    : 'bg-gray-100 group-hover:bg-gray-200 group-hover:scale-110'
                }`}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex-1 text-left">
                <div className={`text-sm font-semibold ${active ? 'font-bold' : 'font-semibold'}`}>
                  {item.label}
                </div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>

              {/* Arrow */}
              {active && <div className="text-blue-600 font-bold text-sm animate-pulse">▶</div>}
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-br from-gray-50 to-white">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-2 animate-bounce">💡</div>
          <div className="text-sm font-bold text-blue-900 mb-1">Need Help?</div>
          <div className="text-xs text-gray-600 leading-relaxed">
            Check our documentation for more information
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
