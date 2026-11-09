"use client"

import { CheckCircle, X } from "lucide-react"
import { useEffect } from "react"

export default function OrderSuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-900">Заказ оформлен!</h2>
          <p className="text-gray-600">Спасибо за покупку! Мы свяжемся с вами в ближайшее время.</p>
          <div className="text-sm text-gray-500">Автоматическое закрытие через 3 секунды...</div>
        </div>
      </div>
    </div>
  )
}
