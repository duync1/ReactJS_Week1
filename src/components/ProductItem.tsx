import type { Product } from '../types/Product'

interface Props {
  product: Product
}

const ProductItem = ({ product }: Props) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s',
        border: '1px solid #e5e7eb',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Product Header */}
      <div
        style={{
          padding: '1.25rem',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '500',
            }}
          >
            ID: #{product.id}
          </span>
          <span
            style={{
              backgroundColor:
                product.rating >= 4 ? '#dcfce7' : product.rating >= 3 ? '#fef3c7' : '#fee2e2',
              color: product.rating >= 4 ? '#15803d' : product.rating >= 3 ? '#92400e' : '#991b1b',
              padding: '0.25rem 0.5rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '600',
            }}
          >
            ⭐ {product.rating.toFixed(1)}
          </span>
        </div>
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0,
            lineHeight: '1.5',
          }}
        >
          {product.title}
        </h3>
      </div>

      {/* Product Body */}
      <div style={{ padding: '1.25rem' }}>
        <p
          style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            margin: '0 0 1rem 0',
            minHeight: '3rem',
          }}
        >
          {product.description}
        </p>

        {/* Product Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
              Price
            </div>
            <div
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#059669',
              }}
            >
              ${product.price.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
              Stock
            </div>
            <span
              style={{
                backgroundColor:
                  product.stock > 50 ? '#dbeafe' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                color: product.stock > 50 ? '#1e40af' : product.stock > 0 ? '#92400e' : '#991b1b',
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '700',
                display: 'inline-block',
              }}
            >
              {product.stock} units
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
