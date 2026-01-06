import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../../types/User'
import type { LoginDTO } from '../../types/dto/LoginDTO'
import {
  createUserApi,
  deleteUserApi,
  getAllUsersApi,
  loginApi,
  registerApi,
  updateUserApi,
} from '../../api/auth/auth.api'
import type { RegisterDTO } from '../../types/dto/RegisterDTO'
import type { CreateUserDTO } from '../../types/dto/CreateUserDTO'

interface AuthState {
  isAuthenticated: boolean
  user: User
  access_token: string
  listUser?: User[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
  isLoading?: boolean
  allUsersForStats?: User[]
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    id: 0,
    email: '',
    fullName: '',
    role: 'user',
  },
  access_token: '',
  listUser: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  allUsersForStats: [],
}

export const login = createAsyncThunk('auth/login', async (data: LoginDTO, { rejectWithValue }) => {
  try {
    const response = await loginApi(data)
    return response.data
  } catch (error: unknown) {
    return rejectWithValue(error)
  }
})

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterDTO, { rejectWithValue }) => {
    try {
      const response = await registerApi(data)
      return response
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (data: CreateUserDTO, { rejectWithValue }) => {
    try {
      const response = await createUserApi(data)
      return response
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (
    payload: { id: number; data: Partial<Omit<CreateUserDTO, 'email'>> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateUserApi(payload.id, payload.data)
      return response
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteUserApi(id)
      return { id }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (
    params: { page: number; limit: number; search?: string; forStats?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await getAllUsersApi(params.page, params.limit, params.search)
      // axiosCustomize đã trả về response.data, nên return trực tiếp
      return { ...response, forStats: params.forStats }
    } catch (error: unknown) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.user = initialState.user
      state.access_token = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ access_token: string; user: User }>) => {
          state.isAuthenticated = true
          state.user = action.payload.user
          state.access_token = action.payload.access_token
        }
      )
      .addCase(register.fulfilled, (state, action: PayloadAction<{ data: User }>) => {
        state.listUser?.push(action.payload.data)
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: {
              items: User[]
              total: number
              page: number
              limit: number
              totalPages: number
            }
            forStats?: boolean
          }>
        ) => {
          state.isLoading = false
          const payload = action.payload?.data
          if (action.payload.forStats) {
            state.allUsersForStats = payload?.items || []
          } else {
            state.listUser = payload?.items || []
            state.total = payload?.total || 0
            state.page = payload?.page || 1
            state.limit = payload?.limit || state.limit
            state.totalPages = payload?.totalPages || 0
          }
        }
      )
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<{ data: User }>) => {
        state.listUser?.push(action.payload.data)
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<{ data: User }>) => {
        const index = state.listUser?.findIndex((u) => u.id === action.payload.data.id)
        if (index !== undefined && index !== -1 && state.listUser) {
          state.listUser[index] = action.payload.data
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.listUser = state.listUser?.filter((u) => u.id !== action.payload.id)
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
