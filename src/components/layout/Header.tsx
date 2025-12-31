import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import { useAppDispatch, type RootState } from '../../redux/store'
import { logout } from '../../redux/slice/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:shadow-lg transition-shadow">
          🛒
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Product Manager</h1>
          <p className="text-xs text-gray-500">Admin Dashboard</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer">
          <span className="text-xl group-hover:scale-110 transition-transform inline-block">
            🔔
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 sm:gap-3 bg-transparent border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
              <div className="text-xs text-gray-500">{user.role}</div>
            </div>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 min-w-[220px] overflow-hidden z-50 animate-slideUp">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-b border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    AD
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{user.fullName}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <button
                  onClick={() => {
                    dispatch(logout())
                    navigate('/login')
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-semibold group cursor-pointer"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
