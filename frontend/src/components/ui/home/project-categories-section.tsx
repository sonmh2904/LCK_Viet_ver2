"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRightCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { designAPI, Design } from "@/services/design/design.api"
import Link from "next/link"

export function ProjectCategoriesSection() {
  const [highlightDesigns, setHighlightDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchHighlightDesigns = async () => {
      try {
        const response = await designAPI.getHighlightDesigns({ limit: 10 })
        setHighlightDesigns(response.data.designs)
      } catch (error) {
        console.error('Failed to fetch highlight designs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHighlightDesigns()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (highlightDesigns.length <= 3) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= highlightDesigns.length - 3 ? 0 : prevIndex + 1
      )
    }, 2500) // Change slide every 2.5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [highlightDesigns.length])

  const visibleDesigns = highlightDesigns.slice(currentIndex, currentIndex + 3)
  return (
    <section id="du-an" className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center">
            Bộ sưu tập công trình nổi bật
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
            Mỗi dự án là một câu chuyện riêng được LCK Việt chăm chút từ tổng thể đến chi tiết, thể hiện cá tính và đẳng cấp của gia chủ.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 sm:h-56 bg-gray-200 rounded-2xl sm:rounded-t-3xl" />
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : highlightDesigns.length > 0 ? (
          <div className="relative">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleDesigns.map((design) => (
                <Link
                  key={design._id}
                  href={`/thiet-ke/${design._id}`}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl block"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={design.mainImage}
                      alt={design.projectName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#8a0303]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <h3 className="text-xl sm:text-2xl font-semibold">{design.projectName}</h3>
                      <p className="text-sm opacity-90">{design.projectType}</p>
                    </div>
                  </div>
                  <div className="space-y-4 p-4 sm:p-6 text-slate-600">
                    <p className="line-clamp-2">{design.detailedDescription || design.functionality}</p>
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#b30000]">
                        Xem chi tiết
                        <ArrowRightCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
                      </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có công trình nổi bật nào.</p>
          </div>
        )}
      </div>
    </section>
  )
}
