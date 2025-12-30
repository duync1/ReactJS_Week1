import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Product } from '../../types/Product'
import type { CreateProductDTO } from '../../types/dto/CreateProductDTO'
import {
  createProductApi,
  deleteProductByIdApi,
  getAllProductsApi,
  getProductByIdApi,
  updateProductByIdApi,
} from '../../api/products/products.api'

export interface GetAllProductsResponse {
  items: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface ProductState {
  listProducts: Product[]
  currentProduct?: Product
  total: number
  page: number
  limit: number
  totalPages: number
}

const initialState: ProductState = {
  listProducts: [],
  currentProduct: undefined,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
}

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (data: CreateProductDTO) => {
    const response = await createProductApi(data)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (payload: { id: number; data: CreateProductDTO }) => {
    const response = await updateProductByIdApi(payload.id, payload.data)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: number) => {
  const response = await deleteProductByIdApi(id)
  return response.data
})

export const getProductById = createAsyncThunk('product/getProductById', async (id: number) => {
  const response = await getProductByIdApi(id)
  return response.data
})

export const getAllProducts = createAsyncThunk<
  GetAllProductsResponse,
  { page: number; limit: number }
>('product/getAllProducts', async (params) => {
  const response = await getAllProductsApi(params.page, params.limit)
  return response.data
})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.listProducts.push(action.payload)
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.listProducts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.listProducts[index] = action.payload
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
        state.listProducts = state.listProducts.filter((p) => p.id !== action.payload.id)
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.listProducts.findIndex((p) => p.id === action.payload.id)
        if (index !== -1) {
          state.currentProduct = action.payload
        }
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<GetAllProductsResponse>) => {
        state.listProducts = action.payload.items
        state.total = action.payload.total
        state.page = action.payload.page
        state.limit = action.payload.limit
        state.totalPages = action.payload.totalPages
      })
  },
})

export default productSlice.reducer
