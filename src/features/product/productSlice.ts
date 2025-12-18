import { createSlice } from '@reduxjs/toolkit'

import type { Product } from '../../types/Product'

export interface ProductState {
  products: Product[]
}
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    description: 'Latest Apple smartphone with A17 Pro chip and titanium design',
    price: 999.99,
    quantity: 45,
  },
  {
    id: 2,
    title: 'MacBook Pro 14"',
    description: 'Powerful laptop with M3 chip, perfect for professionals',
    price: 1999.0,
    quantity: 28,
  },
  {
    id: 3,
    title: 'AirPods Pro',
    description: 'Premium wireless earbuds with active noise cancellation',
    price: 249.99,
    quantity: 120,
  },
  {
    id: 4,
    title: 'iPad Air',
    description: 'Versatile tablet with M1 chip and stunning display',
    price: 599.0,
    quantity: 67,
  },
  {
    id: 5,
    title: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health and fitness tracking',
    price: 399.0,
    quantity: 15,
  },
]

const initialState: ProductState = {
  products: MOCK_PRODUCTS,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload)
    },
  },
})

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions

export default productSlice.reducer
