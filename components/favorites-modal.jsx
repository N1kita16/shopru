"use client"

import { X, ShoppingCart, Trash2, Heart } from "lucide-react"

export default function FavoritesModal({ isOpen, onClose, favorites, onAddToCart, onRemoveFromFavorites }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Избранное</h2>
            {favorites.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {favorites.length} {favorites.length === 1 ? "товар" : "товаров"}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Нет избранных товаров</h3>
            <p className="text-gray-500 mb-6">Добавьте товары в избранное, чтобы вернуться к ним позже</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-lg font-bold text-blue-600">{item.price.toLocaleString("ru-RU")} ₽</p>
                    {item.originalPrice > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {item.originalPrice.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    aria-label="Добавить в корзину"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">В корзину</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromFavorites(item.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                    aria-label="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Удалить</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
