// pages/cart.tsx
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '../store/useStore'

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 0) {
      updateQuantity(id, quantity)
    }
  }

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!')
    clearCart()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Store
              </Link>
            </div>
            
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <span className="text-blue-600 font-semibold">Cart ({totalItems})</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{totalItems} items in your cart</p>
          </div>

          {items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to get started!</p>
              <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="px-6 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="ml-6 flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total Items:</span>
                  <span className="text-lg font-semibold">{totalItems}</span>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold text-gray-900">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={clearCart}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                  
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-500">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}