"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FaUser, FaFileAlt, FaCalendarAlt, FaMapMarkerAlt, FaSpinner, FaArrowLeft, FaRulerCombined, FaBuilding, FaHome, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from "sonner"
import { designAPI, Design } from "@/services/design/design.api"

export default function AdminDesignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [design, setDesign] = useState<Design | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [relatedDesigns, setRelatedDesigns] = useState<Design[]>([])
  const [loadingRelated, setLoadingRelated] = useState(true)
  const id = params.id as string

  const fetchRelatedDesigns = async () => {
    try {
      setLoadingRelated(true)
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

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchDesign()
    }
  }, [id])

  useEffect(() => {
    if (design) {
      fetchRelatedDesigns()
    }
  }, [design])

  const fetchDesign = async () => {
    try {
      setLoading(true)
      console.log('Fetching design with ID:', id)
      
      if (!id) {
        toast.error("ID thiết kế không hợp lệ")
        router.push("/admin/designs")
        return
      }
      
      const response = await designAPI.getDesignById(id)
      const designData = response.data
      console.log('Design data received:', designData)
      
      setDesign(designData)
    } catch (error: any) {
      console.error('Error fetching design:', error)
      
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        toast.error("Không tìm thấy thiết kế")
      } else if (error.message?.includes('400') || error.message?.includes('Invalid')) {
        toast.error("ID thiết kế không hợp lệ")
      } else {
        toast.error("Không thể tải thông tin thiết kế")
      }
      
      router.push("/admin/designs")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa thiết kế này?')) {
      return
    }

    try {
      setDeleteLoading(true)
      await designAPI.deleteDesign(id)
      toast.success("Xóa thiết kế thành công")
      router.push("/admin/designs")
    } catch (error: any) {
      console.error("Error deleting design:", error)
      toast.error("Không thể xóa thiết kế")
    } finally {
      setDeleteLoading(false)
    }
  }

  const getAllImages = () => {
    if (!design) return []
    return [design.mainImage, ...(design.subImages || [])]
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index)
  }

  const nextImage = () => {
    if (design && design.subImages && design.subImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % (design.subImages.length + 1))
    }
  }

  const prevImage = () => {
    if (design && design.subImages && design.subImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + (design.subImages.length + 1)) % (design.subImages.length + 1))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 animate-spin text-[#b30000] mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin thiết kế...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push("/admin/designs")}
            className="px-4 py-2 bg-[#b30000] text-white rounded hover:bg-[#8a0000] transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    )
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Không tìm thấy thiết kế</p>
          <button 
            onClick={() => router.push("/admin/designs")}
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
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/admin/designs"
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Link>
            
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/designs/edit/${design._id}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
              >
                <FaEdit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Link>
              
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaTrash className="w-4 h-4 mr-2" />
                {deleteLoading ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Name Header */}
      <div className="py-4">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold text-[#b30000]">{design.projectName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area - 10 parts */}
            <div className="lg:col-span-12 space-y-8">
              
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
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <FaArrowLeft className="rotate-180" />
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
                <h2 className="text-xl font-bold text-gray-900 mb-6">THÔNG TIN CÔNG TRÌNH</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Chủ đầu tư</p>
                        <p className="text-sm text-gray-700">{design.investor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Loại hình</p>
                        <p className="text-sm text-gray-700">{design.projectType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Năm thực hiện</p>
                        <p className="text-sm text-gray-700">{design.implementationYear}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Địa chỉ</p>
                        <p className="text-sm text-gray-700">{design.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRulerCombined className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Diện tích</p>
                        <p className="text-sm text-gray-700">{design.landArea}m² đất / {design.constructionArea}m² xây dựng</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaBuilding className="w-5 h-5 text-[#b30000]" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Số tầng</p>
                        <p className="text-sm text-gray-700">{design.floors} tầng</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mô tả chi tiết */}
              {design.detailedDescription && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">MÔ TẢ CHI TIẾT</h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {design.detailedDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
