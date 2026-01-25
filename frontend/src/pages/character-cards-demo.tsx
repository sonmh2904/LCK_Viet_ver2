'use client'

import React from 'react'
import CharacterCards from '@/components/ui/character-cards'

const sampleCharacters = [
  {
    id: 'camille',
    name: 'Camille',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_0.jpg',
    role: 'Fighter',
    description: 'Camille là một chiến binh cơ khí tinh xảo từ Piltover, chuyên gia trong việc xử lý các mục tiêu đơn lẻ với khả năng cơ động và sát thương cực lớn.',
    skills: ['Precision Protocol', 'Tactical Sweep', 'Hookshot', 'Hextech Ultimatum']
  },
  {
    id: 'jax',
    name: 'Jax',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg',
    role: 'Fighter',
    description: 'Jax là một bậc thầy vũ khí có thể sử dụng bất kỳ vật gì làm vũ khí. Ông là một trong những chiến binh mạnh nhất ở Ionia.',
    skills: ['Leap Strike', 'Empower', 'Counter Strike', 'Grandmaster\'s Might']
  },
  {
    id: 'kayle',
    name: 'Kayle',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_0.jpg',
    role: 'Support/Fighter',
    description: 'Kayle là thiên thần công lý, liên tục phát triển sức mạnh trong suốt trận đấu và trở thành một lực lượng hủy diệt ở giai đoạn cuối.',
    skills: ['Radiant Blast', 'Celestial Blessing', 'Blazing Star', 'Divine Judgment']
  },
  {
    id: 'aatrox',
    name: 'Aatrox',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg',
    role: 'Fighter',
    description: 'Aatrox là một Darkin bị giam cầm trong thanh kiếm, tìm cách giải phóng bản thân và hủy diệt Runeterra.',
    skills: ['The Darkin Blade', 'Infernal Chains', 'Umbral Dash', 'World Ender']
  }
]

export default function CharacterCardsDemo() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Character Cards Demo
        </h1>
        
        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm">
          <CharacterCards characters={sampleCharacters} />
        </div>
        
        <div className="mt-8 text-center text-gray-400">
          <p>Nhấp vào một thẻ nhân vật để xem chi tiết</p>
          <p>Nhấp vào bên ngoài để đóng panel chi tiết</p>
        </div>
      </div>
    </div>
  )
}
