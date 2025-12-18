import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table, { type Column } from '../components/common/Table'
import AddOrUpdateProductModal from '../components/product/AddOrUpdateProductModal'
import ConfirmDeleteModal from '../components/product/ConfirmDeleteModal'
import { type Product } from '../types/Product'
import type { RootState } from '../store'
import { addProduct, deleteProduct, updateProduct } from '../features/product/productSlice'

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const products = useSelector((state: RootState) => state.product.products)
  const dispatch = useDispatch()
  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      dispatch(updateProduct(product))
    } else {
      // Add new product
      dispatch(addProduct(product))
    }
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id))
      setProductToDelete(null)
    }
  }

  // Define columns for products table
  const columns: Column<Product>[] = [
    {
      key: 'id',
      header: 'ID',
      width: '80px',
      render: (product) => <span className="text-gray-500 text-sm">#{product.id}</span>,
    },
    {
      key: 'title',
      header: 'Product Name',
      width: '250px',
      render: (product) => <div className="font-semibold text-gray-900">{product.title}</div>,
    },
    {
      key: 'description',
      header: 'Description',
      render: (product) => (
        <div className="text-gray-600 text-sm leading-relaxed max-w-xs truncate">
          {product.description}
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      width: '120px',
      align: 'right',
      render: (product) => (
        <span className="text-emerald-600 font-bold">${product.price.toFixed(2)}</span>
      ),
    },
    {
      key: 'quantity',
      header: 'Quantity',
      width: '100px',
      align: 'center',
      render: (product) => (
        <span
          className={`px-3 py-1 rounded-md text-sm font-semibold ${
            product.quantity > 50
              ? 'bg-blue-100 text-blue-800'
              : product.quantity > 0
                ? 'bg-amber-100 text-amber-800'
                : 'bg-red-100 text-red-800'
          }`}
        >
          {product.quantity}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      align: 'center',
      render: (product) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditProduct(product)
            }}
            className="px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md bg-white hover:bg-blue-50 transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteProduct(product)
            }}
            className="px-3 py-1.5 text-sm font-semibold text-red-600 border border-red-600 rounded-md bg-white hover:bg-red-50 transition-colors"
          >
            🗑️
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b-2 border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 whitespace-nowrap"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-3">📦</div>
          <div className="text-sm text-gray-600 mb-1">Total Products</div>
          <div className="text-3xl font-bold text-gray-900">{products.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm text-gray-600 mb-1">Total Quantity</div>
          <div className="text-3xl font-bold text-gray-900">
            {products.reduce((acc, p) => acc + p.quantity, 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-3">💰</div>
          <div className="text-sm text-gray-600 mb-1">Total Value</div>
          <div className="text-3xl font-bold text-emerald-600">
            $
            {products.length > 0
              ? products.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(0)
              : '0'}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-4xl mb-3">💲</div>
          <div className="text-sm text-gray-600 mb-1">Avg Price</div>
          <div className="text-3xl font-bold text-blue-600">
            $
            {products.length > 0
              ? (products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)
              : '0'}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <Table
        columns={columns}
        data={products}
        keyExtractor={(product) => product.id}
        emptyMessage="No products available. Click 'Add Product' to create one."
        emptyIcon="📦"
      />

      {/* Product Modal */}
      <AddOrUpdateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setProductToDelete(null)
        }}
        onConfirm={confirmDelete}
        itemName={productToDelete?.title}
      />
    </div>
  )
}

export default ProductsPage
