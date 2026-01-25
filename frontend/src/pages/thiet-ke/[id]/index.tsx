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
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const fetchDesign = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (!params?.id || typeof params.id !== 'string') {
        throw new Error('Invalid design ID')
      }

      // Add guard for client-side only
      if (typeof window === 'undefined') {
        return
      }

      const response = await designAPI.getDesignById(params.id)
      setDesign(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load design")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedDesigns = async () => {
    try {
      setLoadingRelated(true)
      
      // Add guard for client-side only
      if (typeof window === 'undefined') {
        return
      }
      
      if (design?.categories?._id) {
        const response = await designAPI.getDesigns({
          categories: design.categories._id,
          limit: 6 // Lấy 6 để loại bỏ design hiện tại còn lại 5
        })
        // Lọc bỏ design hiện tại
        const filteredDesigns = response.data.designs.filter(d => d._id !== design._id).slice(0, 5)
        setRelatedDesigns(filteredDesigns)
      }
    } catch (err) {
      console.error('Failed to load related designs:', err)
    } finally {
      setLoadingRelated(false)
    }
  }

  // Add client-side mounting effect
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run on client-side when params.id is available
    if (isClient && params?.id) {
      fetchDesign()
    }
  }, [isClient, params?.id])

  useEffect(() => {
    // Only run on client-side
    if (isClient && design) {
      fetchRelatedDesigns()
    }
  }, [isClient, design])

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

      {/* Project Name Header */}
      <div className="py-2">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold text-[#b30000]">{design.projectName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area - 7 parts */}
            <div className="lg:col-span-9 space-y-8">
              
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
                  <div className="grid grid-cols-5 gap-2">
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

              {/* THÔNG TIN CÔNG TRÌNH */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  THÔNG TIN CÔNG TRÌNH
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaUser className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Chủ đầu tư</p>
                        <p className="text-gray-700">{design.investor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Năm thực hiện</p>
                        <p className="text-gray-700">{design.implementationYear}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaBuilding className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Số tầng</p>
                        <p className="text-gray-700">{design.floors} tầng</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaRulerCombined className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Diện tích đất</p>
                        <p className="text-gray-700">{design.landArea}m²</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaHome className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Công năng</p>
                        <p className="text-gray-700">{design.functionality}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaFileAlt className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Đơn vị thiết kế</p>
                        <p className="text-gray-700">{design.designUnit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FaFileAlt className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Thể loại công trình</p>
                        <p className="text-gray-700">{design.projectType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Địa chỉ</p>
                        <p className="text-gray-700">{design.address}</p>
                      </div>
                    </div>

                    {design.investmentLevel && (
                      <div className="flex items-start gap-3">
                        <FaFileAlt className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Tổng mức đầu tư</p>
                          <p className="text-gray-700">{design.investmentLevel}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <FaRulerCombined className="w-5 h-5 text-[#b30000] mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Diện tích xây dựng</p>
                        <p className="text-gray-700">{design.constructionArea}m²</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              {design.detailedDescription && (
                <div id="mo-ta-chi-tiet" className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">MÔ TẢ CHI TIẾT</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {design.detailedDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Related Designs - 3 parts */}
            <div className="lg:col-span-3 space-y-6">

              
              {/* Các Design Cùng Danh Mục Khác */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Các {design.categories?.name || design.projectType} khác</h3>
                
                {loadingRelated ? (
                  <div className="flex items-center justify-center py-4">
                    <FaSpinner className="w-4 h-4 animate-spin text-[#b30000] mr-2" />
                    <span className="text-sm text-gray-500">Đang tải...</span>
                  </div>
                ) : relatedDesigns.length > 0 ? (
                  <div className="space-y-4">
                    {relatedDesigns.map((relatedDesign) => (
                      <Link 
                        key={relatedDesign._id}
                        href={`/thiet-ke/${relatedDesign._id}`}
                        className="block group"
                      >
                        <div className="space-y-3">
                          {/* Image */}
                          <div className="relative w-full h-32 overflow-hidden rounded-lg">
                            <Image
                              src={relatedDesign.mainImage}
                              alt={relatedDesign.projectName}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          {/* Name */}
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#b30000] transition-colors line-clamp-2">
                            {relatedDesign.projectName}
                          </h4>
                          {/* Info */}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{relatedDesign.categories?.name || relatedDesign.projectType}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Không có design nào cùng danh mục
                  </p>
                )}
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
