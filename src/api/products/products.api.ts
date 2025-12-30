import type { CreateProductDTO } from '../../types/dto/CreateProductDTO'
import axios from '../../utils/axiosCustomize'

export const createProductApi = (data: CreateProductDTO) => {
  return axios.post('/products', data)
}

export const getProductByIdApi = (id: number) => {
  return axios.get(`/products/${id}`)
}

export const updateProductByIdApi = (id: number, data: CreateProductDTO) => {
  return axios.patch(`/products/${id}`, data)
}

export const deleteProductByIdApi = (id: number) => {
  return axios.delete(`/products/${id}`)
}

export const getAllProductsApi = (page: number, limit: number) => {
  return axios.get('/products', {
    params: { page, limit },
  })
}
