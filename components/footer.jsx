"use client"

import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">🛒 ShopRU</h3>
            <p className="text-gray-400 leading-relaxed">
              Лучший интернет-магазин с широким ассортиментом товаров по доступным ценам
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Категории</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Электроника</li>
              <li className="hover:text-white transition-colors cursor-pointer">Одежда</li>
              <li className="hover:text-white transition-colors cursor-pointer">Книги</li>
              <li className="hover:text-white transition-colors cursor-pointer">Дом и сад</li>
              <li className="hover:text-white transition-colors cursor-pointer">Спорт</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Информация</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">О нас</li>
              <li className="hover:text-white transition-colors cursor-pointer">Доставка и оплата</li>
              <li className="hover:text-white transition-colors cursor-pointer">Возврат товара</li>
              <li className="hover:text-white transition-colors cursor-pointer">Контакты</li>
              <li className="hover:text-white transition-colors cursor-pointer">Политика конфиденциальности</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Контакты</h4>
            <div className="text-gray-400 space-y-3">
              <div className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@shopru.com</span>
              </div>
              <div className="flex items-start space-x-2 hover:text-white transition-colors">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Москва, ул. Примерная, д. 123</span>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  )
}
