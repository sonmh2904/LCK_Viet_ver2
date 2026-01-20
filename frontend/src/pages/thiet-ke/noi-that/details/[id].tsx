"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface ProjectDetail {
  id: number
  title: string
  category: string
  image: string
  area: string
  style: string
  description: string
  features: string[]
  images: string[]
  specifications: {
    phongKhach: string
    phongNgu: number
    phongTam: number
    bep: string
    thangMay: boolean
    sanThuong: boolean
    ham: boolean
  }
  materials: {
    san: string
    tuong: string
    tran: string
    cua: string
    noiThat: string
  }
  timeline: {
    thietKe: string
    thiCong: string
    hoanThanh: string
  }
}

const projectDetails: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    title: "Biệt thự hiện đại",
    category: "Biệt thự",
    image: "/images/projects/noi-that/biet-thu-hien-dai-1.jpg",
    area: "450m²",
    style: "Hiện đại",
    description: "Biệt thự hiện đại với thiết kế tối giản, tập trung vào công năng và thẩm mỹ. Không gian mở kết nối giữa phòng khách và bếp, tạo cảm giác rộng rãi và thoáng đãng.",
    features: [
      "Không gian mở phòng khách - bếp",
      "Hệ thống chiếu sáng thông minh",
      "Vật liệu cao cấp tự nhiên",
      "Sân vườn cảnh quan",
      "Hồ bơi riêng tư",
      "Garage 2 ô tô"
    ],
    images: [
      "/images/projects/noi-that/biet-thu-hien-dai-1.jpg",
      "/images/projects/noi-that/biet-thu-hien-dai-2.jpg",
      "/images/projects/noi-that/biet-thu-hien-dai-3.jpg",
      "/images/projects/noi-that/biet-thu-hien-dai-4.jpg"
    ],
    specifications: {
      phongKhach: "Rộng 60m²",
      phongNgu: 4,
      phongTam: 3,
      bep: "Hiện đại 25m²",
      thangMay: true,
      sanThuong: true,
      ham: true
    },
    materials: {
      san: "Gỗ sồi tự nhiên",
      tuong: "Sơn cao cấp kết hợp đá ốp",
      tran: "Thạch cao giật cấp",
      cua: "Nhôm kính cách âm",
      noiThat: "Gỗ óc chó và da thật"
    },
    timeline: {
      thietKe: "15 ngày",
      thiCong: "90 ngày",
      hoanThanh: "105 ngày"
    }
  },
  2: {
    id: 2,
    title: "Nhà phố sang trọng",
    category: "Nhà phố",
    image: "/images/projects/noi-that/nha-pho-sang-trong-1.jpg",
    area: "180m²",
    style: "Tân cổ điển",
    description: "Nhà phố 3 tầng với phong cách tân cổ điển, kết hợp hài hòa giữa nét truyền thống và hiện đại. Mỗi tầng được bố trí công năng hợp lý, tối ưu diện tích sử dụng.",
    features: [
      "Phong cách tân cổ điển sang trọng",
      "Phòng thờ riêng biệt",
      "Sân phơi trên tầng thượng",
      "Hệ thống thông gió tự nhiên",
      "An ninh camera 24/7",
      "Cửa cuốn tự động"
    ],
    images: [
      "/images/projects/noi-that/nha-pho-sang-trong-1.jpg",
      "/images/projects/noi-that/nha-pho-sang-trong-2.jpg",
      "/images/projects/noi-that/nha-pho-sang-trong-3.jpg"
    ],
    specifications: {
      phongKhach: "Rộng 35m²",
      phongNgu: 4,
      phongTam: 3,
      bep: "Rộng 20m²",
      thangMay: false,
      sanThuong: true,
      ham: false
    },
    materials: {
      san: "Granite Việt Nam",
      tuong: "Sơn Jotun cao cấp",
      tran: "Thạch cao phẳng",
      cua: "Gỗ lim tự nhiên",
      noiThat: "Gỗ hương và vân mây"
    },
    timeline: {
      thietKe: "10 ngày",
      thiCong: "60 ngày",
      hoanThanh: "70 ngày"
    }
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const id = parseInt(params.id as string)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const project = projectDetails[id]

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fff8f7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2c1b1a] mb-4">Không tìm thấy dự án</h1>
          <p className="text-lg text-gray-600 mb-8">Dự án bạn tìm kiếm không tồn tại.</p>
          <Link 
            href="/thiet-ke/noi-that" 
            className="bg-[#b30000] hover:bg-[#a00000] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fff8f7]">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="bg-gradient-to-r from-black/70 to-black/50 absolute inset-0"></div>
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-full w-full"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-6">
            <div className="mb-4">
              <span className="bg-[#b30000] px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
                <span>Diện tích: {project.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                <span>Phong cách: {project.style}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-[#2c1b1a] mb-6">Giới thiệu dự án</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-3xl font-bold text-[#2c1b1a] mb-6">Đặc điểm nổi bật</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#b30000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div>
                <h2 className="text-3xl font-bold text-[#2c1b1a] mb-6">Hình ảnh dự án</h2>
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="relative h-96 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-full w-full"></div>
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  <div className="grid grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-[#b30000]' : 'border-transparent'
                        }`}
                      >
                        <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-full w-full"></div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Info */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#b30000]">
                <h3 className="text-xl font-bold text-[#b30000] mb-4">Thông tin nhanh</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loại hình:</span>
                    <span className="font-semibold">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diện tích:</span>
                    <span className="font-semibold">{project.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phong cách:</span>
                    <span className="font-semibold">{project.style}</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#2c1b1a] mb-4">Thông số kỹ thuật</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phòng khách:</span>
                    <span className="font-medium">{project.specifications.phongKhach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phòng ngủ:</span>
                    <span className="font-medium">{project.specifications.phongNgu} phòng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phòng tắm:</span>
                    <span className="font-medium">{project.specifications.phongTam} phòng</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bếp:</span>
                    <span className="font-medium">{project.specifications.bep}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thang máy:</span>
                    <span className="font-medium">{project.specifications.thangMay ? 'Có' : 'Không'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sân thượng:</span>
                    <span className="font-medium">{project.specifications.sanThuong ? 'Có' : 'Không'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hầm:</span>
                    <span className="font-medium">{project.specifications.ham ? 'Có' : 'Không'}</span>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#2c1b1a] mb-4">Vật liệu sử dụng</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sàn:</span>
                    <span className="font-medium">{project.materials.san}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tường:</span>
                    <span className="font-medium">{project.materials.tuong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trần:</span>
                    <span className="font-medium">{project.materials.tran}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cửa:</span>
                    <span className="font-medium">{project.materials.cua}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nội thất:</span>
                    <span className="font-medium">{project.materials.noiThat}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-[#2c1b1a] mb-4">Thời gian thực hiện</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thiết kế:</span>
                    <span className="font-medium">{project.timeline.thietKe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thi công:</span>
                    <span className="font-medium">{project.timeline.thiCong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hoàn thành:</span>
                    <span className="font-medium text-[#b30000] font-bold">{project.timeline.hoanThanh}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b30000] to-[#e60000]">
        <div className="mx-auto w-full max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bạn thích dự án này?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/lien-he" 
              className="bg-white text-[#b30000] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Nhận Tư Vấn Miễn Phí
            </Link>
            <Link 
              href="/bao-gia/thiet-ke" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-white/30"
            >
              Xem Báo Giá Thiết Kế
            </Link>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2c1b1a] mb-4">
              Dự án <span className="text-[#b30000]">liên quan</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá thêm các dự án thiết kế nội thất khác của LCK Việt
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(projectDetails)
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link 
                  key={relatedProject.id} 
                  href={`/thiet-ke/noi-that/details/${relatedProject.id}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-full w-full"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#b30000]">
                      {relatedProject.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c1b1a] mb-2 group-hover:text-[#b30000] transition-colors">
                      {relatedProject.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{relatedProject.area} • {relatedProject.style}</span>
                      <svg className="w-4 h-4 text-[#b30000] transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/thiet-ke/noi-that" 
              className="inline-flex items-center gap-2 bg-[#b30000] hover:bg-[#a00000] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Xem Tất Cả Dự Án
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}