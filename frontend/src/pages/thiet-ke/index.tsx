"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FaUser, FaFileAlt, FaCalendarAlt, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa'
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"
import { designAPI, Design } from "@/services/design/design.api"
import { categoryAPI, Category } from "@/services/category/category.api"

export default function ThietKePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [designs, setDesigns] = useState<Design[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams?.get('category') || "")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const projectsPerPage = 9

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await categoryAPI.getAllCategories({ 
        limit: 100, // Get all categories
        isActive: true 
      })
      setCategories(response.data.categories)
    } catch (err) {
      console.error('Failed to load categories:', err)
    } finally {
      setLoadingCategories(false)
    }
  }

  // Fetch designs
  const fetchDesigns = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: any = {
        page: currentPage,
        limit: projectsPerPage
      }

      // Add search term if provided
      if (searchTerm) {
        params.search = searchTerm
      }

      // Add category filter if selected
      if (selectedCategory) {
        params.categories = selectedCategory
      }

      const response = await designAPI.getDesigns(params)
      setDesigns(response.data.designs)
      setTotalPages(response.data.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load designs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    // Update selected category when URL query parameter changes
    const categoryFromUrl = searchParams?.get('category')
    setSelectedCategory(categoryFromUrl || "")
  }, [searchParams])

  useEffect(() => {
    fetchDesigns()
  }, [currentPage, selectedCategory, searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchDesigns()
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
    
    // Update URL with new category parameter
    const params = new URLSearchParams(searchParams?.toString())
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    router.push(`/thiet-ke?${params.toString()}`)
  }

  if (loading && designs.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-8 h-8 animate-spin text-[#b30000] mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thiết kế...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDesigns}
            className="px-4 py-2 bg-[#b30000] text-white rounded hover:bg-[#8a0000] transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-6">

          {/* Category Title */}
          {selectedCategory && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#b30000]">
                {categories.find(c => c._id === selectedCategory)?.name || 'Tất cả'}
              </h2>
            </div>
          )}

          {/* Projects Grid */}
          {designs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Không tìm thấy thiết kế nào phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {designs.map((design) => (
                <Link 
                  key={design._id} 
                  href={`/thiet-ke/${design._id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={design.mainImage}
                      alt={design.projectName}
                      width={400}
                      height={256}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#b30000]">
                      {design.categories?.name || design.projectType}
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{design.projectName}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4 text-[#b30000]" />
                        <span className="font-medium">Chủ đầu tư:</span> {design.investor}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="w-4 h-4 text-[#b30000]" />
                        <span className="font-medium">Thể loại:</span> {design.projectType}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4 text-[#b30000]" />
                        <span className="font-medium">Năm thực hiện:</span> {design.implementationYear}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-[#b30000]" />
                        <span className="font-medium">Địa chỉ:</span> {design.address}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#b30000] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </main>

      {/* About Map Section */}
      <AboutMapSection />

      {/* Footer CTA Section */}
      <FooterCTASection />
    </div>
  )
}
