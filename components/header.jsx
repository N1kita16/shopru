"use client"

import { ShoppingCart, Heart, LogOut, User } from "lucide-react"

export default function Header({
  user,
  cartCount,
  favoritesCount,
  onAuthClick,
  onProfileClick,
  onCartClick,
  onFavoritesClick,
  onLogout,
}) {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">🛒 ShopRU</div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onFavoritesClick}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
            >
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onProfileClick}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
