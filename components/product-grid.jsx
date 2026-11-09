"use client"

import { Heart, ShoppingCart } from "lucide-react"

export default function ProductGrid({ products, onAddToCart, onAddToFavorites, favorites }) {
  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId)
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Товары не найдены</h3>
        <p className="text-gray-600">Попробуйте выбрать другую категорию</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg animate-pulse">
                -{product.discount}%
              </div>
            )}
            <button
              onClick={() => onAddToFavorites(product)}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isFavorite(product.id)
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-red-500 hover:text-white shadow-md"
              }`}
              aria-label={isFavorite(product.id) ? "Удалить из избранного" : "Добавить в избранное"}
            >
              <Heart className={`w-4 h-4 ${isFavorite(product.id) ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

            <div className="flex flex-col space-y-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-blue-600">{product.price.toLocaleString("ru-RU")} ₽</span>
                {product.originalPrice > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                )}
              </div>
              {product.originalPrice > 0 && (
                <span className="text-xs text-green-600 font-semibold">
                  Экономия: {(product.originalPrice - product.price).toLocaleString("ru-RU")} ₽
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 flex items-center justify-center space-x-2 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>В корзину</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
