'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Handshake, Calendar, DollarSign } from "lucide-react"

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image: string
  detailedDescription?: string
  features?: string[]
}

interface ServicesCardsProps {
  className?: string
}

const servicesData: Service[] = [
  {
    id: 'kinh-nghiem',
    title: 'KINH NGHIỆM THIẾT KẾ',
    description: 'Đội ngũ kiến trúc sư giàu kinh nghiệm, sáng tạo và am hiểu sâu sắc về các phong cách kiến trúc hiện đại.',
    icon: <FileText className="h-8 w-8" />,
    image: '/services/service1.jpg',
    detailedDescription: 'Với hơn 7 năm kinh nghiệm trong ngành kiến trúc và xây dựng, đội ngũ LCK Việt đã hoàn thành hơn 500 dự án lớn nhỏ trên khắp cả nước. Chúng tôi tự hào mang đến những giải pháp kiến trúc tối ưu và đột phá.',
    features: [
      '7+ năm kinh nghiệm',
      '1000+ dự án hoàn thành',
      'Đội ngũ 50+ kiến trúc sư',
      'Chứng chỉ quốc tế'
    ]
  },
  {
    id: 'sang-tao',
    title: 'SÁNG TẠO - ĐỘC ĐÁO',
    description: 'Mỗi công trình là một tác phẩm nghệ thuật độc đáo, thể hiện cá tính riêng của gia chủ.',
    icon: <Handshake className="h-8 w-8" />,
    image: '/services/service2.jpg',
    detailedDescription: 'Chúng tôi không chỉ xây dựng nhà cửa, chúng tôi kiến tạo không gian sống. Mỗi thiết kế là sự kết hợp hoàn hảo giữa công năng, thẩm mỹ và cá tính riêng của chủ nhân.',
    features: [
      'Thiết kế độc quyền',
      'Cá nhân hóa tối đa',
      'Phong cách đa dạng',
      'Material theo yêu cầu'
    ]
  },
  {
    id: 'tien-do',
    title: 'TIẾN ĐỘ ĐÚNG HẸN',
    description: 'Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ thi công đúng cam kết.',
    icon: <Calendar className="h-8 w-8" />,
    image: '/services/service3.jpg',
    detailedDescription: 'Quy trình quản lý dự án hiện đại, cam kết tiến độ rõ ràng trong hợp đồng. Chúng tôi đảm bảo bàn giao công trình đúng hạn với chất lượng tốt nhất.',
    features: [
      'Lịch trình chi tiết',
      'Báo cáo tuần',
      'Ứng dụng theo dõi',
      'Cam kết phạt vi phạm'
    ]
  },
  {
    id: 'chi-phi',
    title: 'CHI PHÍ HỢP LÝ',
    description: 'Tối ưu chi phí mà vẫn đảm bảo chất lượng và thẩm mỹ cho công trình.',
    icon: <DollarSign className="h-8 w-8" />,
    image: '/services/service4.jpg',
    detailedDescription: 'Chúng tôi tối ưu chi phí thông qua quản lý hiệu quả, lựa chọn vật lý thông minh và quy trình thi công chuyên nghiệp, mang lại giá trị tốt nhất cho khách hàng.',
    features: [
      'Báo giá minh bạch',
      'Tối ưu vật liệu',
      'Không phát sinh',
      'Nhiều gói lựa chọn'
    ]
  }
]

const ServicesCards: React.FC<ServicesCardsProps> = ({ className = '' }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedService(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative pb-8 ${className}`} ref={containerRef}>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Service Cards - Parallelogram Style */}
      <div className="flex justify-center items-center gap-0 overflow-x-auto scrollbar-hide">
        {servicesData.map((service, index) => (
          <motion.div
            key={service.id}
            className={`relative cursor-pointer transition-all duration-500 flex-shrink-0 ${
              selectedService === service.id ? 'z-20' : 'z-10'
            }`}
            layout
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              width: selectedService === service.id ? '600px' : '192px',
              height: '450px',
              margin: selectedService === service.id ? '0 20px' : '0',
            }}
            onClick={() => setSelectedService(
              selectedService === service.id ? null : service.id
            )}
            whileHover={{ 
              scale: selectedService === service.id ? 1.02 : 1.05
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Card Container - Parallelogram using clip-path */}
            <div
              className={`relative w-full h-full overflow-hidden ${
                selectedService === service.id
                  ? 'border-4 border-blue-500 shadow-xl shadow-blue-500/30'
                  : 'border-2 border-gray-300'
              } bg-white`}
              style={{
                clipPath: selectedService === service.id 
                  ? 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                  : 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
              }}
            >
              {selectedService === service.id ? (
                // Expanded Content
                <div className="p-6 h-full flex gap-6">
                  {/* Large Image */}
                  <div className="w-48 h-72 rounded-lg overflow-hidden border-2 border-blue-500 flex-shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Service Details */}
                  <div className="flex-1 text-gray-800 overflow-y-auto">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-red-400 to-red-800 bg-clip-text text-transparent mb-3">
                      {service.title}
                    </h2>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      {service.detailedDescription}
                    </p>
                    
                    <p className="text-gray-600 mb-4 text-xs">
                      {service.description}
                    </p>
                    
                    {service.features && service.features.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-red-400 to-red-800 bg-clip-text text-transparent mb-2">Đặc điểm nổi bật:</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-red-400 rounded-full"></div>
                              <span className="text-xs text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Normal Card Content
                <>
                  {/* Service Image */}
                  <div className="w-full h-full transition-all duration-300">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Service Title - Bottom Left */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p
                      className={`text-sm font-bold ${
                        selectedService === service.id ? 'text-blue-500' : 'text-white'
                      }`}
                    >
                      {service.title.split(' ').slice(0, 2).join(' ')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ServicesCards
