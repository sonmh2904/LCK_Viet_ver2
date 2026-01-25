"use client"

import { FileText, Handshake, Calendar, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "KINH NGHIỆM THIẾT KẾ",
    description: "Đội ngũ kiến trúc sư giàu kinh nghiệm, sáng tạo và am hiểu sâu sắc về các phong cách kiến trúc hiện đại.",
  },
  {
    icon: <Handshake className="h-8 w-8" />,
    title: "SÁNG TẠO - ĐỘC ĐÁO",
    description: "Mỗi công trình là một tác phẩm nghệ thuật độc đáo, thể hiện cá tính riêng của gia chủ.",
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "TIẾN ĐỘ ĐÚNG HẸN",
    description: "Quy trình làm việc chuyên nghiệp, đảm bảo tiến độ thi công đúng cam kết.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "CHI PHÍ HỢP LÝ",
    description: "Tối ưu chi phí mà vẫn đảm bảo chất lượng và thẩm mỹ cho công trình.",
  },
]

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white py-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(179, 0, 0, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p 
            className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            LCK VIỆT - KIẾN TẠO TƯƠNG LAI
          </motion.p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-white p-4 sm:p-8 text-center shadow-lg transition-all duration-300 hover:border-[#b30000]/20 hover:shadow-2xl hover:shadow-red-500/10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.15, duration: 0.6 }}
              whileHover={{ 
                scale: 1.02, 
                borderColor: '#b30000',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#b30000]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div 
                className="mb-4 sm:mb-6 flex justify-center"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-red-400 to-red-800 text-white shadow-lg">
                  {service.icon}
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b30000]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </div>
              </motion.div>
              <h3 className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg font-bold uppercase bg-gradient-to-r from-blue-500 via-red-400 to-red-800 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300 whitespace-nowrap">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}