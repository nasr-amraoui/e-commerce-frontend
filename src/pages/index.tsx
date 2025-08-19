// pages/index.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore, useCartStore } from '../store/useStore'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

const products: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 99.99, image: '🎧', description: 'High-quality wireless headphones' },
  { id: '2', name: 'Smart Watch', price: 299.99, image: '⌚', description: 'Feature-rich smartwatch' },
  { id: '3', name: 'Laptop Stand', price: 49.99, image: '💻', description: 'Ergonomic laptop stand' },
  { id: '4', name: 'Coffee Mug', price: 19.99, image: '☕', description: 'Premium ceramic mug' },
  { id: '5', name: 'Desk Lamp', price: 79.99, image: '💡', description: 'LED desk lamp with adjustable brightness' },
  { id: '6', name: 'Mechanical Keyboard', price: 149.99, image: '⌨️', description: 'RGB mechanical keyboard' },
]

export default function Home() {
  const { isAuthenticated, user } = useAuthStore()
  const { addItem, totalItems } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Store</h1>
            </div>
            
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                    Dashboard
                  </Link>
                  <span className="text-gray-600">Welcome, {user?.name}</span>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              )}
              
              <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
                🛒 Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Store</h3>
          <p className="text-gray-400">Your one-stop shop for amazing products</p>
        </div>
      </footer>
    </div>
  )
}