"use client"

import { useState } from "react"
import Link from "next/link"
import { FaUser, FaFileAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

interface Project {
  id: number
  title: string
  category: string
  image: string
  location: string
  area: string
  price?: string
  year?: string
  description?: string
  features?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Biệt Thự Cao Cấp Phong Cách Châu Âu",
    category: "Biệt thự",
    image: "/highlight/hl1.jpg",
    location: "Anh Tuấn",
    area: "450m²",
    price: "Từ 35 tỷ",
    year: "2025",
    description: "Biệt thự cao cấp phong cách châu Âu với kiến trúc sang trọng, không gian sân vườn rộng lớn, tiện ích đẳng cấp.",
    features: ["3 tầng thông minh", "Sân vườn 200m²", "Hồ bơi vô cực", "Garage 3 ô tô", "Thang máy", "Phòng gym riêng"]
  },
  {
    id: 2,
    title: "Nhà Phố Hiện Đại Mặt Tiền 8m",
    category: "Nhà phố",
    image: "/highlight/hl2.jpg",
    location: "Hà Nội",
    area: "200m²",
    price: "Liên hệ",
    year: "2025",
    description: "Nhà phố hiện đại với mặt tiền rộng, thiết kế tối giản, công năng sử dụng hiệu quả cho gia đình.",
    features: ["3 tầng thông minh", "Mặt tiền 8m", "Ban công rộng", "Thang máy", "Sân thượng", "Hệ thống an ninh"]
  },
  {
    id: 3,
    title: "Villa Resort View Hồ Bơi",
    category: "Villa",
    image: "/highlight/hl3.jpg",
    location: "Đà Nẵng",
    area: "380m²",
    price: "Từ 28 tỷ",
    year: "2025",
    description: "Villa resort với hồ bơi riêng, view biển đẹp, kiến trúc nhiệt đới hiện đại, không gian nghỉ dưỡng đẳng cấp.",
    features: ["View biển", "Hồ bơi riêng", "Sân vườn cảnh quan", "Nhà xe ô tô", "Phòng spa", "Hệ thống smarthome"]
  },
  {
    id: 4,
    title: "Nhà Vườn 2 Tầng Khuôn Viên Rộng",
    category: "Nhà vườn",
    image: "/highlight/hl4.jpg",
    location: "Hải Dương",
    area: "280m²",
    price: "Liên hệ",
    year: "2025",
    description: "Nhà vườn với khuôn viên rộng, không gian xanh mát, thiết kế gần gũi với thiên nhiên, phù hợp nghỉ dưỡng.",
    features: ["2 tầng thông minh", "Khuôn viên 500m²", "Vườn cây ăn quả", "Ao cá", "Chòi nghỉ dưỡng", "Hệ thống tưới tự động"]
  },
  {
    id: 5,
    title: "Khách Sạn Boutique 5 Tầng",
    category: "Khách sạn",
    image: "/highlight/hl5.jpg",
    location: "TP.HCM",
    area: "650m²",
    price: "Từ 45 tỷ",
    year: "2025",
    description: "Khách sạn boutique với thiết kế độc đáo, 20 phòng sang trọng, tiện ích 5 sao, vị trí trung tâm.",
    features: ["5 tầng", "20 phòng deluxe", "Nhà hàng 5 sao", "Spa & Wellness", "Conference room", "Rooftop bar"]
  },
  {
    id: 6,
    title: "Resort Biển Cao Cấp 2 Hecta",
    category: "Resort",
    image: "/highlight/hl6.jpg",
    location: "Nha Trang",
    area: "2 hecta",
    price: "Từ 120 tỷ",
    year: "2025",
    description: "Resort biển cao cấp với 50 bungalow, hồ bơi vô cực view biển, sân golf mini, tiện ích nghỉ dưỡng 5 sao.",
    features: ["50 bungalow", "Hồ bơi vô cực", "Sân golf mini", "Spa center", "Nhà hàng biển", "Private beach"]
  }
]

const categories = ["Tất cả", "Biệt thự", "Nhà phố", "Villa", "Nhà vườn", "Khách sạn", "Resort"]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

  const filteredProjects = selectedCategory === "Tất cả" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content - Projects Grid */}
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-6">

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedCategory === category
                    ? "bg-[#b30000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#b30000]">
                    {project.category}
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4 text-[#b30000]" />
                      <span className="font-medium">Chủ đầu tư:</span> {project.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="w-4 h-4 text-[#b30000]" />
                      <span className="font-medium">Thể loại:</span> {project.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4 text-[#b30000]" />
                      <span className="font-medium">Năm thực hiện:</span> {project.year}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-[#b30000]" />
                      <span className="font-medium">Địa chỉ:</span> {project.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
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