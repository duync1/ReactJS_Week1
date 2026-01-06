import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Table, { type Column } from '../components/common/Table'
import Pagination from '../components/common/Pagination'
import Loading from '../components/common/Loading'
import AddOrUpdateUserModal from '../components/user/AddOrUpdateUserModal'
import ConfirmDeleteModal from '../components/product/ConfirmDeleteModal'
import { type User } from '../types/User'
import { useAppDispatch, type RootState } from '../redux/store'
import { createUser, deleteUser, getAllUsers, updateUser } from '../redux/slice/authSlice'
import type { CreateUserDTO } from '../types/dto/CreateUserDTO'

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasToastedRef = useRef(false)
  const users = useSelector((state: RootState) => state.auth.listUser || [])
  const allUsersForStats = useSelector((state: RootState) => state.auth.allUsersForStats || [])
  const isLoading = useSelector((state: RootState) => state.auth.isLoading || false)
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  const searchParam = searchParams.get('search') || ''
  const totalPages = useSelector((state: RootState) => state.auth.totalPages || 0)
  const total = useSelector((state: RootState) => state.auth.total || 0)
  const limit = useSelector((state: RootState) => state.auth.limit || 10)
  const currentUserRole = useSelector((state: RootState) => state.auth.user.role)
  const dispatch = useAppDispatch()

  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchParam)

  // Validate page param
  const isValidPage = !isNaN(pageParam) && pageParam > 0

  const handleAddUser = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleSaveUser = (user: CreateUserDTO) => {
    setIsSubmitting(true)
    if (selectedUser) {
      // Update existing user; keep email, update password only if provided
      const { email: _unusedEmail, ...rest } = user
      const updateData: { fullName: string; role: 'user' | 'admin'; password?: string } = {
        fullName: rest.fullName,
        role: rest.role,
      }

      if (rest.password && rest.password.trim()) {
        updateData.password = rest.password
      }

      dispatch(
        updateUser({
          id: selectedUser.id,
          data: updateData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success('User updated successfully')
          dispatch(getAllUsers({ page: pageParam, limit, search: searchParam }))
        })
        .catch(() => toast.error('Failed to update user'))
        .finally(() => {
          setIsSubmitting(false)
          setIsModalOpen(false)
        })
    } else {
      // Add new user
      dispatch(createUser(user))
        .unwrap()
        .then(() => {
          toast.success('User created successfully')
          dispatch(getAllUsers({ page: pageParam, limit, search: searchParam }))
        })
        .catch(() => toast.error('Failed to create user'))
        .finally(() => {
          setIsSubmitting(false)
          setIsModalOpen(false)
        })
    }
  }

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setIsSubmitting(true)
      dispatch(deleteUser(userToDelete.id))
        .unwrap()
        .then(() => {
          toast.success('User deleted successfully')
          dispatch(getAllUsers({ page: pageParam, limit, search: searchParam }))
        })
        .catch(() => toast.error('Failed to delete user'))
        .finally(() => {
          setIsSubmitting(false)
          setUserToDelete(null)
          setIsDeleteModalOpen(false)
        })
    }
  }

  useEffect(() => {
    hasToastedRef.current = false
    dispatch(getAllUsers({ page: pageParam, limit, search: searchParam }))
      .unwrap()
      .catch((error) => {
        if (error.statusCode === 400 && !hasToastedRef.current) {
          hasToastedRef.current = true
          const messages = Array.isArray(error.message) ? error.message.join(', ') : error.message
          toast.error(messages)
          setSearchParams({ page: '1' })
        }
      })
    // Lấy toàn bộ users cho stats (limit lớn) - chỉ gọi khi page hợp lệ
    if (isValidPage) {
      dispatch(getAllUsers({ page: 1, limit: 10000, forStats: true }))
    }
  }, [dispatch, pageParam, limit, searchParam, setSearchParams, isValidPage])

  // Sync search input with URL param
  useEffect(() => {
    setSearchInput(searchParam)
  }, [searchParam])

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: String(newPage) }
    if (searchParam) params.search = searchParam
    setSearchParams(params)
  }

  const handleSearch = () => {
    const params: Record<string, string> = { page: '1' }
    if (searchInput.trim()) params.search = searchInput.trim()
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setSearchParams({ page: '1' })
  }

  // Define columns for users table
  const columns: Column<User>[] = [
    {
      key: 'no',
      header: 'No',
      width: '60px',
      render: (_user, index) => (
        <span className="text-gray-700 font-semibold">{(pageParam - 1) * limit + index + 1}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      width: '280px',
      render: (user) => (
        <div
          className="font-semibold text-gray-900 truncate cursor-pointer max-w-[280px]"
          title={user.email}
        >
          📧 {user.email}
        </div>
      ),
    },
    {
      key: 'fullName',
      header: 'Full Name',
      width: '220px',
      render: (user) => (
        <div
          className="text-gray-700 font-medium truncate cursor-pointer max-w-[220px]"
          title={user.fullName}
        >
          {user.fullName}
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      width: '120px',
      align: 'center',
      render: (user) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}
        >
          {user.role === 'admin' ? '👑 Admin' : '👤 User'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      align: 'center',
      hidden: currentUserRole !== 'admin',
      render: (user) =>
        currentUserRole === 'admin' && (
          <div className="flex gap-2 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEditUser(user)
              }}
              className="px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md bg-white hover:bg-blue-50 transition-colors cursor-pointer"
            >
              ✏️ Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteUser(user)
              }}
              className="px-3 py-1.5 text-sm font-semibold text-red-600 border border-red-600 rounded-md bg-white hover:bg-red-50 transition-colors cursor-pointer"
            >
              🗑️
            </button>
          </div>
        ),
    },
  ]

  const adminCount = allUsersForStats.filter((u) => u.role === 'admin').length
  const userCount = allUsersForStats.filter((u) => u.role === 'user').length

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 relative">
      {isSubmitting && <Loading message="Saving..." color="orange" />}
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b-2 border-gradient-to-r from-purple-200 to-pink-200">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            Users Management
          </h1>
          <p className="text-gray-600 font-medium">👥 Manage system users</p>
        </div>
        {currentUserRole === 'admin' &&
          isValidPage &&
          totalPages > 0 &&
          pageParam <= totalPages && (
            <button
              onClick={handleAddUser}
              className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              ➕ Add User
            </button>
          )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Search by email
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter email address..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          {searchParam && (
            <div className="md:w-32 flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-200">
          <div className="text-5xl mb-3 animate-pulse">👥</div>
          <div className="text-sm text-purple-700 font-semibold mb-1 uppercase tracking-wide">
            Total Users
          </div>
          <div className="text-4xl font-black text-purple-900">{allUsersForStats.length}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-200">
          <div className="text-5xl mb-3 animate-pulse">👤</div>
          <div className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wide">
            Regular Users
          </div>
          <div className="text-4xl font-black text-blue-900">{userCount}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-pink-200">
          <div className="text-5xl mb-3 animate-pulse">👑</div>
          <div className="text-sm text-pink-700 font-semibold mb-1 uppercase tracking-wide">
            Administrators
          </div>
          <div className="text-4xl font-black text-pink-900">{adminCount}</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-indigo-200">
          <div className="text-5xl mb-3 animate-pulse">📊</div>
          <div className="text-sm text-indigo-700 font-semibold mb-1 uppercase tracking-wide">
            Current Page
          </div>
          <div className="text-4xl font-black text-indigo-900">
            {pageParam}/{totalPages}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="relative">
        {isLoading && <Loading message="Loading users..." color="purple" />}

        <Table
          columns={columns}
          data={users}
          keyExtractor={(user) => user.id}
          emptyMessage="No users available. Click 'Add User' to create one."
          emptyIcon="👥"
        />

        {/* Pagination */}
        {isValidPage && totalPages > 0 && pageParam <= totalPages && (
          <Pagination
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* User Modal */}
      <AddOrUpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={selectedUser}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setUserToDelete(null)
        }}
        onConfirm={confirmDelete}
        itemName={userToDelete?.fullName}
      />
    </div>
  )
}

export default UsersPage
