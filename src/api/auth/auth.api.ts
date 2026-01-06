import type { CreateUserDTO } from '../../types/dto/CreateUserDTO'
import type { LoginDTO } from '../../types/dto/LoginDTO'
import type { RegisterDTO } from '../../types/dto/RegisterDTO'
import axios from '../../utils/axiosCustomize'

export const loginApi = (data: LoginDTO) => {
  return axios.post('/auth/login', data)
}

export const registerApi = (data: RegisterDTO) => {
  return axios.post('/auth/register', data)
}

export const getAllUsersApi = (page: number, limit: number, search?: string) => {
  return axios.get('/auth/users', {
    params: { page, limit, search },
  })
}

export const createUserApi = (data: CreateUserDTO) => {
  return axios.post('/auth/users', data)
}

export const updateUserApi = (id: number, data: Partial<Omit<CreateUserDTO, 'email'>>) => {
  return axios.patch(`/auth/users/${id}`, data)
}

export const deleteUserApi = (id: number) => {
  return axios.delete(`/auth/users/${id}`)
}
