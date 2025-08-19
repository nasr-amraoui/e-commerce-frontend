// store/useStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

interface DashboardState {
  stats: {
    totalOrders: number
    totalRevenue: number
    totalCustomers: number
    totalProducts: number
  }
  recentOrders: Array<{
    id: string
    customer: string
    amount: number
    status: string
    date: string
  }>
  updateStats: (stats: DashboardState['stats']) => void
  addOrder: (order: DashboardState['recentOrders'][0]) => void
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        if (email === 'admin@example.com' && password === 'password') {
          const user = { id: '1', email, name: 'Admin User' }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: true }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Cart Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (newItem) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === newItem.id)
        
        let updatedItems
        if (existingItem) {
          updatedItems = items.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        } else {
          updatedItems = [...items, { ...newItem, quantity: 1 }]
        }
        
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, totalItems, totalPrice })
      },
      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.id !== id)
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, totalItems, totalPrice })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        const { items } = get()
        const updatedItems = items.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        
        set({ items: updatedItems, totalItems, totalPrice })
      },
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
)

// Dashboard Store
export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: {
    totalOrders: 150,
    totalRevenue: 25000,
    totalCustomers: 75,
    totalProducts: 200,
  },
  recentOrders: [
    { id: '1', customer: 'John Doe', amount: 299.99, status: 'completed', date: '2024-01-15' },
    { id: '2', customer: 'Jane Smith', amount: 159.50, status: 'pending', date: '2024-01-14' },
    { id: '3', customer: 'Bob Johnson', amount: 89.99, status: 'shipped', date: '2024-01-13' },
  ],
  updateStats: (stats) => set({ stats }),
  addOrder: (order) => {
    const { recentOrders } = get()
    set({ recentOrders: [order, ...recentOrders.slice(0, 9)] })
  },
}))