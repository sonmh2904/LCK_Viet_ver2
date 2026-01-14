"use client"

import { ArrowRightCircle, Building2, Home, PenTool } from "lucide-react"

const services = [
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Thiết kế kiến trúc",
    description:
      "Định hình phong cách sống và tối ưu công năng với đội ngũ kiến trúc sư giàu kinh nghiệm.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Thi công xây dựng",
    description:
      "Quy trình kiểm soát chất lượng chặt chẽ, đảm bảo tiến độ và tính thẩm mỹ từng hạng mục.",
  },
  {
    icon: <Home className="h-6 w-6" />,
    title: "Hoàn thiện nội thất",
    description:
      "Giải pháp nội thất đồng bộ, hòa hợp với kiến trúc tổng thể, tối ưu không gian sống cho gia đình.",
  },
]

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#fff2ee]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#ffe0d9] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000]">
            Giải pháp của chúng tôi
          </p>
          <h2 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">
            Dịch vụ trọn gói kiến tạo tổ ấm chuẩn LCK Việt
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
            Từ tư vấn, thiết kế đến thi công hoàn thiện – đội ngũ chuyên gia của chúng tôi cam kết mang đến trải nghiệm đồng nhất, chỉnh chu và tối ưu cho từng gia chủ.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-[#ffe0d9] bg-white p-8 shadow-[0_30px_70px_-60px_rgba(179,0,0,0.6)] transition-transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd1c4] via-white to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b30000] text-white shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
                <p className="text-slate-600">{service.description}</p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#cf1f1f]">
                  Tìm hiểu thêm
                  <ArrowRightCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
