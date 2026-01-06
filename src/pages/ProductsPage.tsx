import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Table, { type Column } from '../components/common/Table'
import Pagination from '../components/common/Pagination'
import Loading from '../components/common/Loading'
import AddOrUpdateProductModal from '../components/product/AddOrUpdateProductModal'
import ConfirmDeleteModal from '../components/product/ConfirmDeleteModal'
import { type Product } from '../types/Product'
import { useAppDispatch, type RootState } from '../redux/store'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../redux/slice/productSlice'
import type { CreateProductDTO } from '../types/dto/CreateProductDTO'

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hasToastedRef = useRef(false)
  const products = useSelector((state: RootState) => state.products.listProducts)
  const isLoading = useSelector((state: RootState) => state.products.isLoading)
  const allProductsForStats = useSelector((state: RootState) => state.products.allProductsForStats)
  // Lấy page từ URL query param, không lấy từ Redux
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  const searchParam = searchParams.get('search') || ''
  const sortPriceParam = (searchParams.get('sortPrice') as 'ASC' | 'DESC') || undefined
  const totalPages = useSelector((state: RootState) => state.products.totalPages)
  const limit = useSelector((state: RootState) => state.products.limit)
  const role = useSelector((state: RootState) => state.auth.user.role)
  const dispatch = useAppDispatch()

  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchParam)

  // Validate page param
  const isValidPage = !isNaN(pageParam) && pageParam > 0
  // const navigate = useNavigate()
  const handleAddProduct = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSaveProduct = (product: CreateProductDTO) => {
    setIsSubmitting(true)
    if (selectedProduct) {
      dispatch(updateProduct({ id: selectedProduct.id, data: product }))
        .unwrap()
        .then(() => toast.success('Product updated successfully'))
        .catch(() => toast.error('Failed to update product'))
        .finally(() => {
          setIsSubmitting(false)
          setIsModalOpen(false)
        })
    } else {
      // Add new product
      dispatch(createProduct(product))
        .unwrap()
        .then(() => {
          toast.success('Product created successfully')
          // Gọi lại API để lấy đúng dữ liệu trang hiện tại
          dispatch(getAllProducts({ page: pageParam, limit }))
        })
        .catch(() => toast.error('Failed to create product'))
        .finally(() => {
          setIsSubmitting(false)
          setIsModalOpen(false)
        })
    }
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setIsSubmitting(true)
      dispatch(deleteProduct(productToDelete.id))
        .unwrap()
        .then(() => toast.success('Product deleted successfully'))
        .catch(() => toast.error('Failed to delete product'))
        .finally(() => {
          setIsSubmitting(false)
          setProductToDelete(null)
          setIsDeleteModalOpen(false)
        })
    }
  }

  useEffect(() => {
    hasToastedRef.current = false
    dispatch(
      getAllProducts({ page: pageParam, limit, search: searchParam, sortPrice: sortPriceParam })
    )
      .unwrap()
      .catch((error) => {
        if (error.statusCode === 400 && !hasToastedRef.current) {
          hasToastedRef.current = true
          const messages = Array.isArray(error.message) ? error.message.join(', ') : error.message
          toast.error(messages)
          setSearchParams({ page: '1' })
        }
      })
    // Lấy toàn bộ sản phẩm cho stats (limit lớn) - chỉ gọi khi page hợp lệ
    if (isValidPage) {
      dispatch(getAllProducts({ page: 1, limit: 10000, forStats: true }))
    }
  }, [dispatch, pageParam, limit, searchParam, sortPriceParam, setSearchParams, isValidPage])

  // Sync search input with URL param
  useEffect(() => {
    setSearchInput(searchParam)
  }, [searchParam])

  const handlePageChange = (newPage: number) => {
    const params: Record<string, string> = { page: String(newPage) }
    if (searchParam) params.search = searchParam
    if (sortPriceParam) params.sortPrice = sortPriceParam
    setSearchParams(params)
  }

  const handleSearch = () => {
    const params: Record<string, string> = { page: '1' }
    if (searchInput.trim()) params.search = searchInput.trim()
    if (sortPriceParam) params.sortPrice = sortPriceParam
    setSearchParams(params)
  }

  const handleSortChange = (value: string) => {
    const params: Record<string, string> = { page: '1' }
    if (searchParam) params.search = searchParam
    if (value) params.sortPrice = value
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    setSearchInput('')
    setSearchParams({ page: '1' })
  }

  // Define columns for products table
  const columns: Column<Product>[] = [
    {
      key: 'no',
      header: 'No',
      width: '60px',
      render: (_product, index) => (
        <span className="text-gray-700 font-semibold">{(pageParam - 1) * limit + index + 1}</span>
      ),
    },
    {
      key: 'name',
      header: 'Product Name',
      width: '210px',
      render: (product) => (
        <div
          className="font-semibold text-gray-900 truncate cursor-pointer max-w-[220px]"
          title={product.name}
        >
          {product.name}
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      width: '320px',
      render: (product) => (
        <div
          className="text-gray-600 text-sm truncate cursor-pointer max-w-[800px]"
          title={product.description}
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
      hidden: role !== 'admin',
      render: (product) =>
        role === 'admin' && (
          <div className="flex gap-2 justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEditProduct(product)
              }}
              className="px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-md bg-white hover:bg-blue-50 transition-colors cursor-pointer"
            >
              ✏️ Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteProduct(product)
              }}
              className="px-3 py-1.5 text-sm font-semibold text-red-600 border border-red-600 rounded-md bg-white hover:bg-red-50 transition-colors cursor-pointer"
            >
              🗑️
            </button>
          </div>
        ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 relative">
      {isSubmitting && <Loading message="Saving..." color="orange" />}
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b-2 border-gradient-to-r from-blue-200 to-purple-200">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Products Management
          </h1>
          <p className="text-gray-600 font-medium">📊 Manage your product inventory</p>
        </div>
        {role === 'admin' && isValidPage && totalPages > 0 && pageParam <= totalPages && (
          <button
            onClick={handleAddProduct}
            className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:from-emerald-700 hover:to-emerald-800 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            ➕ Add Product
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🔍 Search by name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter product name..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
          <div className="md:w-48">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💰 Sort by price
            </label>
            <select
              value={sortPriceParam || ''}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Default</option>
              <option value="ASC">Low to High</option>
              <option value="DESC">High to Low</option>
            </select>
          </div>
          {(searchParam || sortPriceParam) && (
            <div className="md:w-32 flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards (Toàn bộ sản phẩm) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-200">
          <div className="text-5xl mb-3 animate-pulse">📦</div>
          <div className="text-sm text-blue-700 font-semibold mb-1 uppercase tracking-wide">
            Total Products
          </div>
          <div className="text-4xl font-black text-blue-900">{allProductsForStats.length}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-200">
          <div className="text-5xl mb-3 animate-pulse">📊</div>
          <div className="text-sm text-purple-700 font-semibold mb-1 uppercase tracking-wide">
            Total Quantity
          </div>
          <div className="text-4xl font-black text-purple-900">
            {allProductsForStats.reduce((acc, p) => acc + p.quantity, 0)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-200">
          <div className="text-5xl mb-3 animate-pulse">💰</div>
          <div className="text-sm text-emerald-700 font-semibold mb-1 uppercase tracking-wide">
            Total Value
          </div>
          <div className="text-4xl font-black text-emerald-900">
            $
            {allProductsForStats.length > 0
              ? allProductsForStats.reduce((acc, p) => acc + p.price * p.quantity, 0).toFixed(0)
              : '0'}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-200">
          <div className="text-5xl mb-3 animate-pulse">💲</div>
          <div className="text-sm text-amber-700 font-semibold mb-1 uppercase tracking-wide">
            Avg Price
          </div>
          <div className="text-4xl font-black text-amber-900">
            $
            {allProductsForStats.length > 0
              ? (
                  allProductsForStats.reduce((acc, p) => acc + p.price, 0) /
                  allProductsForStats.length
                ).toFixed(2)
              : '0'}
          </div>
        </div>
      </div>

      {/* Products Table */}

      <div className="relative">
        {isLoading && <Loading message="Loading products..." color="blue" />}

        <Table
          columns={columns}
          data={products}
          keyExtractor={(product) => product.id}
          emptyMessage="No products available. Click 'Add Product' to create one."
          emptyIcon="📦"
        />

        {/* Pagination */}
        {isValidPage && totalPages > 0 && pageParam <= totalPages && (
          <Pagination
            currentPage={pageParam}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

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
        itemName={productToDelete?.name}
      />
    </div>
  )
}

export default ProductsPage
