"use client"

import { ArrowRightCircle } from "lucide-react"

const projectCategories = [
  {
    name: "Biệt thự cao cấp",
    description: "Phong cách tân cổ điển, hiện đại, tinh tế theo chuẩn LCK Việt.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nhà phố - Shophouse",
    description: "Mặt tiền nổi bật, tối ưu kinh doanh và sinh hoạt gia đình.",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Công trình dịch vụ",
    description: "Khách sạn, nhà hàng, showroom mang dấu ấn thương hiệu riêng biệt.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
]

export function ProjectCategoriesSection() {
  return (
    <section id="du-an" className="relative overflow-hidden bg-[#fff3f0] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ffe4dc,transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Bộ sưu tập công trình nổi bật
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
            Mỗi dự án là một câu chuyện riêng được LCK Việt chăm chút từ tổng thể đến chi tiết, thể hiện cá tính và đẳng cấp của gia chủ.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projectCategories.map((category) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-3xl border border-[#ffd1c4] bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8a0303]/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                </div>
              </div>
              <div className="space-y-4 p-6 text-slate-600">
                <p>{category.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#b30000]">
                  Xem chi tiết
                  <ArrowRightCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
