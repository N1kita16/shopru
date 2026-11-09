"use client"

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"

export default function CartModal({ isOpen, onClose, cart, onUpdateCart, onOrderComplete }) {
  if (!isOpen) return null

  const updateQuantity = (productId, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
        }
        return item
      })
      .filter((item) => item !== null)

    onUpdateCart(updatedCart)
  }

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId)
    onUpdateCart(updatedCart)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Корзина</h2>
            {cart.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {itemCount} {itemCount === 1 ? "товар" : "товаров"}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Корзина пуста</h3>
            <p className="text-gray-500 mb-6">Добавьте товары, чтобы начать покупки</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
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
                    <p className="text-lg font-bold text-blue-600">{item.price.toLocaleString("ru-RU")} ₽</p>
                    <p className="text-sm text-gray-500">
                      Сумма: {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Уменьшить количество"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Увеличить количество"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                    aria-label="Удалить из корзины"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Товаров:</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Итого:</span>
                  <span className="text-blue-600">{total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <button
                onClick={onOrderComplete}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
