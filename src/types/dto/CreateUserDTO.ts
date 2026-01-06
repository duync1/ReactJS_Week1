export interface CreateUserDTO {
  email: string
  password: string
  fullName: string
  role: 'user' | 'admin'
}
