"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import Advertisement from "@/components/advertisement"
import AuthModal from "@/components/auth-modal"
import ProfileModal from "@/components/profile-modal"
import CartModal from "@/components/cart-modal"
import FavoritesModal from "@/components/favorites-modal"
import OrderSuccessModal from "@/components/order-success-modal"
import { products } from "@/data/products"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showDiscounts, setShowDiscounts] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false)
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [mounted, setMounted] = useState(false)

  const itemsPerPage = 15

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    const savedFavorites = localStorage.getItem("favorites")

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Error parsing user data:", e)
        localStorage.removeItem("user")
      }
    }
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error parsing cart data:", e)
        localStorage.removeItem("cart")
      }
    }
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Error parsing favorites data:", e)
        localStorage.removeItem("favorites")
      }
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart, mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites, mounted])

  const filteredProducts = products.filter((product) => {
    if (showDiscounts) return product.discount > 0
    if (selectedCategory === "all") return true
    return product.category === selectedCategory
  })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ]
    })
  }

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const handleLogin = (userData) => {
    setUser(userData)
    if (mounted) {
      localStorage.setItem("user", JSON.stringify(userData))
    }
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    if (mounted) {
      localStorage.removeItem("user")
    }
  }

  const handleOrderComplete = () => {
    setCart([])
    setIsCartModalOpen(false)
    setIsOrderSuccessModalOpen(true)
    setTimeout(() => {
      setIsOrderSuccessModalOpen(false)
    }, 3000)
  }

  const categories = ["all", "electronics", "clothing", "books", "home", "sports"]

  const getCategoryName = (category) => {
    const names = {
      all: "Все товары",
      electronics: "Электроника",
      clothing: "Одежда",
      books: "Книги",
      home: "Дом",
      sports: "Спорт",
    }
    return names[category] || category
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Advertisement position="top-left" />
      <Advertisement position="top-right" />
      <Advertisement position="bottom-left" />
      <Advertisement position="bottom-right" />

      <Header
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        favoritesCount={favorites.length}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onCartClick={() => setIsCartModalOpen(true)}
        onFavoritesClick={() => setIsFavoritesModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-balance">Добро пожаловать в ShopRU</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => {
                setShowDiscounts(false)
                setSelectedCategory("all")
                setCurrentPage(1)
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                !showDiscounts && selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              Все товары
            </button>

            <button
              onClick={() => {
                setShowDiscounts(true)
                setSelectedCategory("all")
                setCurrentPage(1)
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                showDiscounts ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
              }`}
            >
              🔥 Скидки
            </button>

            {categories.slice(1).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setShowDiscounts(false)
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  !showDiscounts && selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {getCategoryName(category)}
              </button>
            ))}
          </div>

          <div className="text-gray-600 mb-4">
            <span className="font-semibold">
              {showDiscounts ? "Товары со скидками" : getCategoryName(selectedCategory)}:
            </span>{" "}
            {filteredProducts.length} {filteredProducts.length === 1 ? "товар" : "товаров"}
          </div>
        </div>

        <ProductGrid
          products={currentProducts}
          onAddToCart={addToCart}
          onAddToFavorites={addToFavorites}
          favorites={favorites}
        />

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
              }`}
            >
              ← Назад
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-110 ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-md"
              }`}
            >
              Вперёд →
            </button>
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={(userData) => {
          setUser(userData)
          if (mounted) {
            localStorage.setItem("user", JSON.stringify(userData))
          }
        }}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        onUpdateCart={setCart}
        onOrderComplete={handleOrderComplete}
      />

      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        onAddToCart={addToCart}
        onRemoveFromFavorites={(productId) => {
          setFavorites((prev) => prev.filter((item) => item.id !== productId))
        }}
      />

      <OrderSuccessModal isOpen={isOrderSuccessModalOpen} onClose={() => setIsOrderSuccessModalOpen(false)} />
    </div>
  )
}
