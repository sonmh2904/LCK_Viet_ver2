"use client"

import Image from "next/image"

const CORE_VALUES = [
  "Đồng hành cùng khách hàng từ tư vấn, thiết kế đến thi công hoàn thiện",
  "Ứng dụng công nghệ và vật liệu tiên tiến, đảm bảo độ bền và tính thẩm mỹ",
  "Quy trình quản lý minh bạch, chú trọng tiến độ và an toàn lao động",
  "Đội ngũ kiến trúc sư, kỹ sư, thợ tay nghề cao cam kết trách nhiệm lâu dài",
]

export function AboutInfoSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f2f2f2] via-transparent to-transparent" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center rounded-full bg-[#b30000]/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000] mb-4">
              Giới thiệu
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow">
              Không gian sống bền vững cho mỗi gia đình Việt
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4b3a36] sm:text-lg">
              Chúng tôi lấy nhu cầu của gia chủ làm trọng tâm, tạo nên những tổ ấm mang đậm dấu ấn cá nhân bằng quy trình chuẩn hoá và đội ngũ chuyên gia dày dặn kinh nghiệm.
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600">
              <p>
                Thành lập với sứ mệnh nâng tầm chuẩn mực kiến trúc – nội thất tại Việt Nam, LCK Việt Nam sở hữu hệ sinh thái
                giải pháp trọn gói giúp tối ưu thời gian, chi phí và chất lượng cho từng công trình nhà ở, biệt thự, văn phòng
                lẫn không gian thương mại.
              </p>
              <p>
                Sử dụng mô hình thi công Design & Build, chúng tôi kiểm soát chặt chẽ mọi giai đoạn triển khai, bảo đảm bản
                thiết kế được hiện thực hoá chính xác, sắc nét và hiệu quả nhất.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CORE_VALUES.map((value) => (
              <div key={value} className="flex gap-3 rounded-2xl border border-[#f3c7bb] bg-white/80 p-4 shadow-sm">
                <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#b30000]/10 text-[#b30000]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <p className="text-sm font-medium text-[#3f2d28]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 justify-center">
          <div className="relative w-full max-w-[460px] overflow-hidden rounded-[36px] border-[6px] border-white shadow-2xl shadow-[#b30000]/15">
            <Image
              src="/banner/banner-2.jpg"
              alt="Đội ngũ LCK Việt đang tư vấn thiết kế"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 460px"
              priority
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b30000]">Tư vấn cá nhân hoá</p>
              <p className="mt-2 text-sm text-[#4b3a36]">
                Mỗi bản thiết kế được phát triển dựa trên lối sống, thói quen và mong muốn của gia chủ, đảm bảo công năng tối ưu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
