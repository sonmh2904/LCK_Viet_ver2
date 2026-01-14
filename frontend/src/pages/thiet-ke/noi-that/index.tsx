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
    title: "Nhà Đẹp Chuẩn Chí Phí, Bố Trí Chỉn Chu",
    category: "Nhà đẹp",
    image: "https://vinhtuong.com/sites/default/files/inline-images/uu-diem-nha-cap-4.png",
    location: "Chú Khương",
    area: "120m²",
    price: "Liên hệ",
    year: "2025",
    description: "Mẫu nhà đẹp 3 tầng theo phong cách truyền thống Việt Nam, kết hợp hài hòa giữa nét cổ điển và hiện đại.",
    features: ["3 tầng thông minh", "Mái Nhật đẹp", "Sân vườn rộng", "Thang máy", "Garage 2 ô tô", "Phòng thờ riêng biệt"]
  },
  {
    id: 2,
    title: "Nhà Đẹp Phong Cách Hiện Đại",
    category: "Nhà đẹp",
    image: "https://kientrucroman.com.vn/wp-content/uploads/biet-thu-dep-phong-cach-hien-dai-1.jpg",
    location: "Hà Nội",
    area: "150m²",
    price: "Liên hệ",
    year: "2025",
    description: "Mẫu nhà phố hiện đại với thiết kế tối giản, công năng sử dụng hiệu quả, phù hợp với gia đình trẻ.",
    features: ["4 tầng thông minh", "Ban công rộng", "Thang máy", "Sân thượng", "Hệ thống an ninh", "Thiết kế tối ưu không gian"]
  },
  {
    id: 3,
    title: "Biệt Thự Cao Cấp Vinhomes Riverside",
    category: "Biệt thự",
    image: "https://www.bietthuvinhomesriverside.biz/images/news/202362211812.jpg",
    location: "Long Biên",
    area: "350m²",
    price: "Từ 25 tỷ",
    year: "2025",
    description: "Biệt thự sang trọng với view sông Hồng, thiết kế đẳng cấp, tiện ích 5 sao, không gian sống xanh.",
    features: ["View sông Hồng", "Hồ bơi vô cực", "Sân vườn cảnh quan", "Nhà xe ô tô", "Phòng gym riêng", "Hệ thống smarthome"]
  },
  {
    id: 4,
    title: "Nhà Phố 3 Tầng Gia Đình",
    category: "Nhà phố",
    image: "https://sieuthibanve.com/upload/images/202203/281453-mat-tien-nha-ong-3-tang-5x20m-4-phong-ngu.jpg",
    location: "Bắc Ninh",
    area: "180m²",
    price: "Liên hệ",
    year: "2025",
    description: "Nhà phố 3 tầng phong cách tân cổ điển, mặt tiền rộng, khu dân trí cao, an ninh 24/7.",
    features: ["3 tầng thông minh", "Mặt tiền 8m", "Sân vườn sau", "Thang máy", "2 garage ô tô", "Phòng kho", "Camera an ninh"]
  },
  {
    id: 5,
    title: "Căn Hộ Cao Cấp The Matrix One",
    category: "Căn hộ",
    image: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/6/24/1529047/3-1.jpg",
    location: "Nam Từ Liêm",
    area: "85m²",
    price: "Từ 3.5 tỷ",
    year: "2025",
    description: "Căn hộ cao cấp với thiết kế đột phá, tiện ích 5 sao, vị trí vàng Nam Từ Liêm.",
    features: ["TTTM 5 sao", "Hồ bơi vô cực", "Gym & Spa", "Công viên nội khu", "Bảo vệ 24/7", "View đẹp"]
  },
  {
    id: 6,
    title: "Nhà Liền Kề Gamuda City",
    category: "Nhà liền kề",
    image: "https://thietkenoithatatz.com/wp-content/uploads/2021/03/thiet-ke-noi-that-lien-ke-gamuda-13.jpg",
    location: "Hà Nội",
    area: "95m²",
    price: "Từ 4.2 tỷ",
    year: "2025",
    description: "Nhà liền kề với không gian xanh, thiết kế hiện đại, cộng đồng văn minh.",
    features: ["Không gian xanh", "Công viên 5ha", "Hồ bơi", "Trường học liên cấp", "An ninh 24/7", "Sân chơi trẻ em"]
  }
]

const categories = ["Tất cả", "Nhà đẹp", "Biệt thự", "Nhà phố", "Căn hộ", "Nhà liền kề"]

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