"use client"

import { useState, useEffect } from "react"

export default function Advertisement({ position }) {
  const [currentAd, setCurrentAd] = useState(0)

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }

  const ads = [
    { text: "Скидка 50%!", color: "bg-gradient-to-r from-red-500 to-pink-500", icon: "🔥" },
    { text: "Новинки!", color: "bg-gradient-to-r from-green-500 to-emerald-500", icon: "⭐" },
    { text: "Хит продаж!", color: "bg-gradient-to-r from-purple-500 to-indigo-500", icon: "💎" },
    { text: "Акция дня!", color: "bg-gradient-to-r from-orange-500 to-yellow-500", icon: "🎁" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const ad = ads[currentAd]

  return (
    <div className={`fixed ${positionClasses[position]} z-30 hidden lg:block`}>
      <div
        className={`${ad.color} text-white px-4 py-3 rounded-lg shadow-2xl text-sm font-bold flex items-center space-x-2 animate-pulse hover:scale-110 transition-transform cursor-pointer`}
      >
        <span className="text-xl">{ad.icon}</span>
        <span>{ad.text}</span>
      </div>
    </div>
  )
}
