import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../../types/User'
import type { LoginDTO } from '../../types/dto/LoginDTO'
import { loginApi, registerApi } from '../../api/auth/auth.api'
import type { RegisterDTO } from '../../types/dto/RegisterDTO'

interface AuthState {
  isAuthenticated: boolean
  user: User
  access_token: string
  listUser?: User[]
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
}

export const login = createAsyncThunk('auth/login', async (data: LoginDTO) => {
  const response = await loginApi(data)
  return response.data
})

export const register = createAsyncThunk('auth/register', async (data: RegisterDTO) => {
  const response = await registerApi(data)
  return response.data
})

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
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
