import type { LoginDTO } from '../../types/dto/LoginDTO'
import type { RegisterDTO } from '../../types/dto/RegisterDTO'
import axios from '../../utils/axiosCustomize'

export const loginApi = (data: LoginDTO) => {
  return axios.post('/auth/login', data)
}

export const registerApi = (data: RegisterDTO) => {
  return axios.post('/auth/register', data)
}
