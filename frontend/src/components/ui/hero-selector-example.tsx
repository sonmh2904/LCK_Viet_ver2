'use client'

import React from 'react'
import HeroSelector from './hero-selector'

// Example usage data
const exampleHeroes = [
  {
    id: 'camille',
    name: 'Camille',
    avatar: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Camille_0.jpg',
    title: 'The Steel Shadow',
    description: 'Một chiến binh cơ khí từ Piltover, chuyên gia trong việc xử lý các mục tiêu đơn lẻ.'
  },
  {
    id: 'jax',
    name: 'Jax',
    avatar: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Jax_0.jpg',
    title: 'Grandmaster at Arms',
    description: 'Bậc thầy vũ khí có thể sử dụng bất kỳ vật gì làm vũ khí.'
  },
  {
    id: 'kayle',
    name: 'Kayle',
    avatar: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Kayle_0.jpg',
    title: 'The Righteous',
    description: 'Thiên thần công lý liên tục phát triển sức mạnh trong suốt trận đấu.'
  },
  {
    id: 'aatrox',
    name: 'Aatrox',
    avatar: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg',
    title: 'The Darkin Blade',
    description: 'Darkin bị giam cầm trong thanh kiếm, tìm cách hủy diệt Runeterra.'
  }
]

export default function HeroSelectorExample() {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-4 text-center">
        Chọn Tướng
      </h3>
      <HeroSelector heroes={exampleHeroes} />
    </div>
  )
}
