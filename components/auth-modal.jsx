"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!isLogin && formData.name.trim().length < 2) {
      setError("Имя должно содержать минимум 2 символа")
      return
    }

    if (formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      return
    }

    if (isLogin) {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const user = savedUsers.find((u) => u.email === formData.email && u.password === formData.password)

      if (user) {
        onLogin(user)
        setFormData({ name: "", email: "", password: "" })
      } else {
        setError("Неверный email или пароль")
      }
    } else {
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const existingUser = savedUsers.find((u) => u.email === formData.email)

      if (existingUser) {
        setError("Пользователь с таким email уже существует")
        return
      }

      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: null,
        phone: "",
        address: "",
      }

      savedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(savedUsers))
      onLogin(newUser)
      setFormData({ name: "", email: "", password: "" })
    }
  }

  const handleClose = () => {
    setFormData({ name: "", email: "", password: "" })
    setError("")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{isLogin ? "Вход" : "Регистрация"}</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                type="text"
                required
                minLength={2}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Иван Иванов"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Минимум 6 символов"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            {isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войдите"}
          </button>
        </div>
      </div>
    </div>
  )
}
