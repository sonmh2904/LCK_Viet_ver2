"use client"

import { ArrowRightCircle, BadgeCheck, CheckCircle2, MapPin } from "lucide-react"

const featuredProjects = [
  {
    name: "Biệt thự song lập Ecopark",
    location: "Hưng Yên",
    area: "320m²",
    description: "Thiết kế kiến trúc hiện đại kết hợp mảng xanh thiên nhiên, kính bao quanh mở rộng không gian.",
    image:
      "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Nhà phố thương mại Vinhome",
    location: "Hà Nội",
    area: "185m²",
    description: "Tối ưu mặt tiền kinh doanh, gam đỏ đặc trưng giúp nhận diện thương hiệu nổi bật.",
    image:
      "https://www.daaninterior.com/wp-content/uploads/2020/01/shophouse-vincom-my-tho.jpg",
  },
  {
    name: "Resort ven biển An Giang",
    location: "Phú Quốc",
    area: "2.600m²",
    description: "Không gian nghỉ dưỡng cao cấp, chuỗi tiện ích khép kín và cảnh quan bản địa.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  },
]

export function FeaturedProjectsSection() {
  return (
    <section className="relative bg-white py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#ffe9e2]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#ffe0d9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000]">
              Công trình tiêu biểu 2025
            </p>
            <h2 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
              Dấu ấn thiết kế – thi công chuẩn LCK Việt
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Các dự án được chọn lọc kỹ lưỡng phản ánh năng lực thiết kế, tổ chức thi công, cũng như sự hài lòng của khách hàng trên khắp cả nước.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 text-[#b30000]">
              <BadgeCheck className="h-4 w-4" />
              Đối tác chiến lược của hơn 20 thương hiệu vật liệu uy tín
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Bảo hành công trình tối thiểu 2 năm
            </span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.name}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#ffd1c4] bg-white shadow-[0_30px_90px_-70px_rgba(179,0,0,0.7)] transition-transform hover:-translate-y-2"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8a0303]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-white">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{project.name}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6 text-slate-600">
                <p>{project.description}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-[#b30000]">
                  <span>Diện tích: {project.area}</span>
                  <button className="inline-flex items-center gap-2 uppercase tracking-[0.3em]">
                    Chi tiết
                    <ArrowRightCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
