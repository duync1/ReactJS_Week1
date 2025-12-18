export interface User {
  id: number
  username: string
  fullName: string
  role: 'admin' | 'user'
}
