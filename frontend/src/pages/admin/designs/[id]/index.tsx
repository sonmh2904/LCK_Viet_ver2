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
  const id = params.id as string

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchDesign()
    }
  }, [id])

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/designs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{design.projectName}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    {design.projectType}
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">
                    {design.categories?.name || 'Không có danh mục'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 ml-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh chính</h2>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={design.mainImage}
                  alt={design.projectName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sub Images */}
            {design.subImages && design.subImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh phụ ({design.subImages.length})</h2>
                <div className="space-y-4">
                  {/* Main Image Display */}
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src={currentImageIndex === 0 ? design.mainImage : design.subImages[currentImageIndex - 1]}
                      alt={`${design.projectName} - ${currentImageIndex === 0 ? 'Main' : `Sub ${currentImageIndex}`}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Image Navigation */}
                  {(design.subImages.length > 0 || currentImageIndex > 0) && (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaArrowLeft className="w-4 h-4 mr-2" />
                        Trước
                      </button>
                      
                      <span className="text-sm text-gray-600">
                        {currentImageIndex === 0 ? 'Hình chính' : `Hình phụ ${currentImageIndex}`}
                      </span>
                      
                      <button
                        onClick={nextImage}
                        disabled={currentImageIndex === design.subImages.length}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sau
                        <FaArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                      </button>
                    </div>
                  )}

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mt-4">
                    {/* Main Image Thumbnail */}
                    <div
                      onClick={() => setCurrentImageIndex(0)}
                      className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        currentImageIndex === 0 ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={design.mainImage}
                        alt="Main image"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        Chính
                      </div>
                    </div>
                    
                    {/* Sub Images Thumbnails */}
                    {design.subImages.map((subImage, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentImageIndex(index + 1)}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          currentImageIndex === index + 1 ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={subImage}
                          alt={`Sub image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin dự án</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaUser className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Chủ đầu tư</p>
                    <p className="text-sm text-gray-600">{design.investor}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaFileAlt className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Loại hình</p>
                    <p className="text-sm text-gray-600">{design.projectType}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaCalendarAlt className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Năm thực hiện</p>
                    <p className="text-sm text-gray-600">{design.implementationYear}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Địa chỉ</p>
                    <p className="text-sm text-gray-600">{design.address}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaBuilding className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Đơn vị thiết kế</p>
                    <p className="text-sm text-gray-600">{design.designUnit}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaHome className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Chức năng</p>
                    <p className="text-sm text-gray-600">{design.functionality}</p>
                  </div>
                </div>

                {design.investmentLevel && (
                  <div className="flex items-center">
                    <FaFileAlt className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Mức đầu tư</p>
                      <p className="text-sm text-gray-600">{design.investmentLevel}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <FaRulerCombined className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Diện tích</p>
                    <p className="text-sm text-gray-600">
                      {design.landArea}m² đất / {design.constructionArea}m² xây dựng
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaBuilding className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Số tầng</p>
                    <p className="text-sm text-gray-600">{design.floors} tầng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {design.detailedDescription && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Mô tả chi tiết</h2>
                <div className="prose prose-sm text-gray-600">
                  <p className="whitespace-pre-wrap">{design.detailedDescription}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
