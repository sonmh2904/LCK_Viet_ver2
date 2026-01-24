"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type ProjectImage = {
  id: number
  src: string
  alt: string
}

export function FeaturedProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Project images data
  const projects: ProjectImage[] = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `/highlight/hl${i + 1}.jpg`,
    alt: `Dự án nổi bật ${i + 1} của LCK Việt`,
  }))

  // Auto-rotate projects
  useEffect(() => {
    if (isPaused) return
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [isPaused, projects.length])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  // Calculate visible projects (2 before and 2 after current index)
  const getVisibleProjects = () => {
    const visible = []
    const length = projects.length
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + length) % length
      visible.push({
        ...projects[index],
        isCenter: i === 0,
        position: i
      })
    }
    
    return visible
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <span className="inline-flex items-center rounded-full bg-[#b30000]/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000] mb-4">
            Dự án
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#b30000] font-sans italic drop-shadow text-center">
            Các công trình nổi bật của LCK Việt
          </h2>
        </div>
        
        <div 
          className="relative h-[300px] sm:h-[400px] md:h-[500px] max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {getVisibleProjects().map((project) => (
                <div
                  key={project.id}
                  className={`absolute transition-all duration-500 ease-in-out ${
                    project.isCenter 
                      ? 'z-10 scale-100 sm:scale-110 shadow-2xl' 
                      : 'opacity-0 sm:opacity-80 scale-75 sm:scale-90'
                  } ${project.position === -2 ? '-translate-x-[150%] sm:-translate-x-[150%]' : ''}
                     ${project.position === -1 ? '-translate-x-[75%] sm:-translate-x-[75%]' : ''}
                     ${project.position === 1 ? 'translate-x-[75%] sm:translate-x-[75%]' : ''}
                     ${project.position === 2 ? 'translate-x-[150%] sm:translate-x-[150%]' : ''}
                     cursor-pointer hover:opacity-100`}
                  onClick={() => setCurrentIndex(projects.findIndex(p => p.id === project.id))}
                >
                  <div className={`relative ${
                    project.isCenter ? 'w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] md:w-[400px] md:h-[300px]' : 'w-[200px] h-[150px] sm:w-[250px] sm:h-[180px] md:w-[300px] md:h-[225px]'
                  } rounded-lg overflow-hidden`}>
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={project.isCenter}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-700 p-1.5 sm:p-2 rounded-full shadow-lg z-20"
            aria-label="Previous project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-700 p-1.5 sm:p-2 rounded-full shadow-lg z-20"
            aria-label="Next project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-red-700 w-8 h-1.5 -mt-0.5' : 'bg-gray-300'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
