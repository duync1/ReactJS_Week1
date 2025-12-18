import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import type { Product } from '../types/Product'

export interface ProductState {
  products: Product[]
  currentProduct?: Product
}

const initialState: ProductState = {
  products: [],
  currentProduct: undefined,
}

export const fetchProducts = createAsyncThunk<Product[]>('product/fetchProducts', async () => {
  const res = await axios.get('https://dummyjson.com/products')
  return res.data.products
})

export const fetchProductById = createAsyncThunk<Product, number>(
  'product/fetchProductById',
  async (id: number) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`)
    return res.data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
  },
})

export default productSlice.reducer
