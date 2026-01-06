import axios from 'axios'

import { store } from '../redux/store'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.access_token

    const isPublicEndpoint =
      config.url?.startsWith('/auth/login') || config.url?.startsWith('/auth/register')

    if (accessToken && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      message: error.response?.data?.message || 'Unknown error',
      statusCode: error.response?.status,
      raw: error.response?.data,
    })
  }
)

export default instance
