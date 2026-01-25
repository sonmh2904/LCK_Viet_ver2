'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Character {
  id: string
  name: string
  image: string
  role?: string
  description?: string
  skills?: string[]
}

interface CharacterCardsProps {
  characters: Character[]
}

const CharacterCards: React.FC<CharacterCardsProps> = ({ characters }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedCharacter(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative bg-gray-900 rounded-lg p-6" ref={containerRef}>
      {/* Character Cards */}
      <div className="flex gap-4 justify-center items-center">
        {characters.map((character) => (
          <motion.div
            key={character.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedCharacter === character.id ? 'scale-110 z-20' : 'scale-100 z-10'
            }`}
            onClick={() => setSelectedCharacter(
              selectedCharacter === character.id ? null : character.id
            )}
            whileHover={{ scale: selectedCharacter === character.id ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Card Container */}
            <div
              className={`relative w-32 h-40 rounded-lg overflow-hidden border-2 ${
                selectedCharacter === character.id
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/50'
                  : 'border-gray-600'
              }`}
            >
              {/* Character Image */}
              <div
                className={`w-full h-full ${
                  selectedCharacter === character.id ? '' : 'grayscale opacity-70'
                }`}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Character Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p
                  className={`text-sm font-bold text-center ${
                    selectedCharacter === character.id ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  {character.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Detail Panel */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 right-0 mt-4 z-30"
          >
            <div className="bg-gray-800 rounded-lg border-2 border-yellow-400 p-6 shadow-xl">
              {characters
                .filter(char => char.id === selectedCharacter)
                .map(character => (
                  <div key={character.id} className="flex gap-6">
                    {/* Large Character Image */}
                    <div className="w-48 h-60 rounded-lg overflow-hidden border-2 border-yellow-400">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Character Details */}
                    <div className="flex-1 text-white">
                      <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                        {character.name}
                      </h2>
                      
                      {character.role && (
                        <p className="text-lg text-gray-300 mb-4">
                          Vai trò: <span className="text-yellow-300">{character.role}</span>
                        </p>
                      )}
                      
                      {character.description && (
                        <div className="mb-4">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Mô tả</h3>
                          <p className="text-gray-300 leading-relaxed">{character.description}</p>
                        </div>
                      )}
                      
                      {character.skills && character.skills.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">Kỹ năng</h3>
                          <div className="flex flex-wrap gap-2">
                            {character.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-yellow-400/20 border border-yellow-400 rounded-full text-sm text-yellow-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
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

export default CharacterCards
