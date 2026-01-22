"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FaUser, FaFileAlt, FaCalendarAlt, FaMapMarkerAlt, FaSpinner, FaArrowLeft, FaRulerCombined, FaBuilding, FaHome } from 'react-icons/fa'
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"
import { designAPI, Design } from "@/services/design/design.api"

export default function DesignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [design, setDesign] = useState<Design | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const fetchDesign = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!params.id || typeof params.id !== 'string') {
        throw new Error('Invalid design ID')
      }

      const response = await designAPI.getDesignById(params.id)
      setDesign(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load design")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDesign()
  }, [params.id])

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  const nextImage = () => {
    if (design && design.subImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % (design.subImages.length + 1))
    }
  }

  const prevImage = () => {
    if (design && design.subImages.length > 0) {
      const totalImages = design.subImages.length + 1
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }

  const getAllImages = () => {
    if (!design) return []
    return [design.mainImage, ...design.subImages]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 animate-spin text-[#b30000] mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin thiết kế...</p>
        </div>
      </div>
    )
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Không tìm thấy thiết kế"}</p>
          <button 
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#b30000] text-white rounded hover:bg-[#8a0000] transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  const allImages = getAllImages()
  const currentImage = allImages[currentImageIndex]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#b30000] to-[#8a0000] text-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link 
            href="/thiet-ke"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Quay lại danh sách thiết kế</span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{design.projectName}</h1>
          <div className="flex flex-wrap gap-4 text-lg">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {design.projectType}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {design.categories?.name || design.projectType}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={currentImage}
                  alt={design.projectName}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FaArrowLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FaArrowLeft className="rotate-180" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`relative aspect-video overflow-hidden rounded border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-[#b30000] scale-105"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${design.projectName} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Information */}
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin dự án</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaUser className="w-5 h-5 text-[#b30000] mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Chủ đầu tư</p>
                      <p className="text-gray-700">{design.investor}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaFileAlt className="w-5 h-5 text-[#b30000] mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Loại hình</p>
                      <p className="text-gray-700">{design.projectType}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="w-5 h-5 text-[#b30000] mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Năm thực hiện</p>
                      <p className="text-gray-700">{design.implementationYear}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-[#b30000] mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Địa chỉ</p>
                      <p className="text-gray-700">{design.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaHome className="w-5 h-5 text-[#b30000] mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Đơn vị thiết kế</p>
                      <p className="text-gray-700">{design.designUnit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông số kỹ thuật</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaRulerCombined className="w-5 h-5 text-[#b30000]" />
                    <div>
                      <p className="font-semibold text-gray-900">Diện tích đất</p>
                      <p className="text-gray-700">{design.landArea}m²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaBuilding className="w-5 h-5 text-[#b30000]" />
                    <div>
                      <p className="font-semibold text-gray-900">Diện tích xây dựng</p>
                      <p className="text-gray-700">{design.constructionArea}m²</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaHome className="w-5 h-5 text-[#b30000]" />
                    <div>
                      <p className="font-semibold text-gray-900">Số tầng</p>
                      <p className="text-gray-700">{design.floors} tầng</p>
                    </div>
                  </div>

                  {design.investmentLevel && (
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="font-semibold text-gray-900">Mức đầu tư</p>
                        <p className="text-gray-700">{design.investmentLevel}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {design.detailedDescription && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Mô tả chi tiết</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {design.detailedDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Functionality */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Công năng sử dụng</h2>
                <p className="text-gray-700 leading-relaxed">
                  {design.functionality}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA Section */}
      <FooterCTASection />
    </div>
  )
}
