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
      render: (product) => (
        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>#{product.id}</span>
      ),
    },
    {
      key: 'title',
      header: 'Product Name',
      width: '250px',
      render: (product) => (
        <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>
          {product.title}
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (product) => (
        <div
          style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
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
        <span style={{ color: '#059669', fontWeight: '700', fontSize: '0.95rem' }}>
          ${product.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'quantity',
      header: 'Quantity',
      width: '100px',
      align: 'center',
      render: (product) => (
        <span
          style={{
            backgroundColor:
              product.quantity > 50 ? '#dbeafe' : product.quantity > 0 ? '#fef3c7' : '#fee2e2',
            color: product.quantity > 50 ? '#1e40af' : product.quantity > 0 ? '#92400e' : '#991b1b',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '600',
          }}
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
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditProduct(product)
            }}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              border: '1px solid #3b82f6',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              color: '#3b82f6',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#eff6ff'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteProduct(product)
            }}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              border: '1px solid #ef4444',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              color: '#ef4444',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fef2f2'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'white'
            }}
          >
            🗑️
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e5e7eb',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937',
              margin: '0 0 0.5rem 0',
            }}
          >
            Products Management
          </h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>
            Manage your product inventory
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.75rem 1.5rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#059669'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#10b981'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ➕ Add Product
        </button>
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
