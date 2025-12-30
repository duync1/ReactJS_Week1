import axios from 'axios'

import { store } from '../redux/store'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.access_token

    if (accessToken && !config.url?.startsWith('/auth')) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response.data ?? response,
  (error) => Promise.reject(error?.response?.data?.message || error)
)

export default instance
