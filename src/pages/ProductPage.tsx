import { useEffect, useState } from 'react'

import type { Product } from '../types/Product'
import ProductItem from '../components/ProductItem'

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const handleToggleProducts = () => {
    setIsVisible(!isVisible)
  }

  const handleGetProducts = () => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        setIsVisible(true)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }

  useEffect(() => {
    handleGetProducts()
  }, [])

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header Section */}
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
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
          }}
        >
          Product Management
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleToggleProducts}
            style={{
              backgroundColor: isVisible ? '#ef4444' : '#10b981',
              color: 'white',
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isVisible ? '#dc2626' : '#059669'
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isVisible ? '#ef4444' : '#10b981'
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {isVisible ? '👁️ Hide' : '👁️ Show'}
          </button>
        </div>
      </div>

      {/* Products Count */}
      <div
        style={{
          marginBottom: '1.5rem',
          color: '#6b7280',
          fontSize: '0.95rem',
        }}
      >
        Total Products: <strong style={{ color: '#1f2937' }}>{products.length}</strong>
        {products.length > 0 && (
          <span style={{ marginLeft: '1rem' }}>
            • Status:{' '}
            <strong style={{ color: isVisible ? '#10b981' : '#ef4444' }}>
              {isVisible ? 'Visible' : 'Hidden'}
            </strong>
          </span>
        )}
      </div>

      {/* Products Grid - Sử dụng ProductItem với props */}
      {!isVisible ? (
        <div
          style={{
            backgroundColor: '#fef3c7',
            borderRadius: '0.75rem',
            border: '2px dashed #f59e0b',
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🙈</div>
          <div style={{ color: '#92400e', fontSize: '1.125rem', fontWeight: '600' }}>
            Products are hidden. Click "Show" to display them.
          </div>
        </div>
      ) : products.length === 0 ? (
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '4rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
          <div style={{ color: '#9ca3af', fontSize: '1.125rem' }}>
            No products available. Click "Get Products" to fetch data.
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>

          {/* Footer Info */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductPage
