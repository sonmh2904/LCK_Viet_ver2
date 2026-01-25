'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Hero {
  id: string
  name: string
  avatar: string
  title?: string
  description?: string
}

interface HeroSelectorProps {
  heroes: Hero[]
  className?: string
}

const HeroSelector: React.FC<HeroSelectorProps> = ({ heroes, className = '' }) => {
  const [selectedHero, setSelectedHero] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedHero(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Hero Cards */}
      <div className="flex gap-3 justify-center items-center">
        {heroes.map((hero) => (
          <motion.div
            key={hero.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedHero === hero.id ? 'scale-110 z-20' : 'scale-100 z-10'
            }`}
            onClick={() => setSelectedHero(
              selectedHero === hero.id ? null : hero.id
            )}
            whileHover={{ scale: selectedHero === hero.id ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Card Container */}
            <div
              className={`relative w-24 h-32 rounded-lg overflow-hidden border-2 ${
                selectedHero === hero.id
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/50'
                  : 'border-gray-600'
              }`}
            >
              {/* Hero Avatar */}
              <div
                className={`w-full h-full ${
                  selectedHero === hero.id ? '' : 'grayscale opacity-70'
                }`}
              >
                <img
                  src={hero.avatar}
                  alt={hero.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Hero Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                <p
                  className={`text-xs font-bold text-center ${
                    selectedHero === hero.id ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  {hero.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Detail Panel */}
      <AnimatePresence>
        {selectedHero && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 mt-3 z-30"
          >
            <div className="bg-gray-800 rounded-lg border-2 border-yellow-400 p-4 shadow-xl">
              {heroes
                .filter(hero => hero.id === selectedHero)
                .map(hero => (
                  <div key={hero.id} className="flex gap-4">
                    {/* Large Hero Avatar */}
                    <div className="w-32 h-40 rounded-lg overflow-hidden border-2 border-yellow-400">
                      <img
                        src={hero.avatar}
                        alt={hero.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Hero Details */}
                    <div className="flex-1 text-white">
                      <h2 className="text-2xl font-bold text-yellow-400 mb-1">
                        {hero.name}
                      </h2>
                      
                      {hero.title && (
                        <p className="text-sm text-gray-300 mb-3 italic">
                          {hero.title}
                        </p>
                      )}
                      
                      {hero.description && (
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {hero.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroSelector
