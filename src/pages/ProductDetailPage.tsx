import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import type { Product } from '../types/Product'

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null)

  const { id } = useParams()

  useEffect(() => {
    console.log('Fetching product with ID:', id)

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Product data received:', data)
        setProduct(data)
      })
      .catch((err) => {
        console.error('Error fetching product:', err)
      })
  }, [id])

  if (!product) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '1.5rem',
          color: '#6b7280',
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div
          style={{
            marginBottom: '2rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Home
          </a>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <a href="/products" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Products
          </a>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span style={{ color: '#1f2937' }}>{product.title}</span>
        </div>

        {/* Main Content */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              padding: '3rem',
            }}
          >
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  marginBottom: '1.5rem',
                  border: '2px solid #e5e7eb',
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '500px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1rem',
                }}
              >
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div>
              {/* Product ID */}
              <div
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '0.5rem',
                }}
              >
                Product ID: #{product.id}
              </div>

              {/* Product Title */}
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  lineHeight: '1.2',
                }}
              >
                {product.title}
              </h1>

              {/* Rating & Stock */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      backgroundColor:
                        product.rating >= 4
                          ? '#dcfce7'
                          : product.rating >= 3
                            ? '#fef3c7'
                            : '#fee2e2',
                      color:
                        product.rating >= 4
                          ? '#15803d'
                          : product.rating >= 3
                            ? '#92400e'
                            : '#991b1b',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                    }}
                  >
                    ⭐ {product.rating.toFixed(1)}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>(256 reviews)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      backgroundColor:
                        product.stock > 50 ? '#dbeafe' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                      color:
                        product.stock > 50 ? '#1e40af' : product.stock > 0 ? '#92400e' : '#991b1b',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                    }}
                  >
                    📦 {product.stock} in stock
                  </span>
                </div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                  Price
                </div>
                <div
                  style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: '#059669',
                  }}
                >
                  ${product.price.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Tax included. Shipping calculated at checkout.
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.75rem',
                  }}
                >
                  Description
                </h3>
                <p
                  style={{
                    color: '#6b7280',
                    lineHeight: '1.8',
                    fontSize: '0.95rem',
                  }}
                >
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '1rem 2rem',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    border: 'none',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#3b82f6'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  🛒 Add to Cart
                </button>
                <button
                  style={{
                    backgroundColor: 'white',
                    color: '#3b82f6',
                    padding: '1rem',
                    fontSize: '1.5rem',
                    border: '2px solid #3b82f6',
                    borderRadius: '0.75rem',
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
                  ❤️
                </button>
              </div>

              {/* Additional Info */}
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🚚</span>
                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                      Free shipping on orders over $100
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>↩️</span>
                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                      30-day return policy
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>✅</span>
                    <span style={{ color: '#374151', fontSize: '0.875rem' }}>
                      2-year warranty included
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
