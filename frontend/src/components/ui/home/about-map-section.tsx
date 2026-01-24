"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"

const STATS = [
  { value: "7", suffix: "+", label: "Năm kinh nghiệm", accent: "text-[#0066cc]" },
  { value: "1000", suffix: "+", label: "Công trình", accent: "text-[#b30000]" },
  { value: "34", suffix: "+", label: "Tỉnh thành", accent: "text-[#0066cc]" },
  { value: "100", suffix: "+", label: "Nhân viên văn phòng", accent: "text-[#b30000]" },
  { value: "200", suffix: "+", label: "Thợ thi công & sản xuất", accent: "text-[#0066cc]" },
] as const

export function AboutMapSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(STATS.map(() => 0))
  const [isBouncing, setIsBouncing] = useState(STATS.map(() => false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds animation
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      const newStats = STATS.map((stat) => Math.floor(parseInt(stat.value) * easeOutQuart))
      setAnimatedStats(newStats)

      // Trigger bounce animation when reaching target
      if (currentStep === steps) {
        setIsBouncing(STATS.map(() => true))
        setTimeout(() => {
          setIsBouncing(STATS.map(() => false))
        }, 600) // Bounce animation duration
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f2f2f2] via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#f05123] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#b30000]">
              Giới thiệu
            </span>
          </div>
          <h2 className="mt-3 text-4xl md:text-5xl font-black uppercase tracking-[0.12em] bg-gradient-to-r from-[#2c1b1a] via-[#b30000] to-[#2c1b1a] bg-clip-text text-transparent leading-tight">
            LCK Việt
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-[15px] leading-relaxed text-slate-600">
            <p>
              <span className="font-semibold text-[#b30000]">LCK Việt</span> là đơn vị chuyên sâu trong lĩnh vực
              <span className="font-semibold"> thiết kế và thi công kiến trúc nội thất</span>, cung cấp các giải pháp trọn gói cho nhà ở, biệt thự,
              văn phòng, showroom và công trình thương mại.
            </p>
            <p>
              Với phương châm <span className="font-semibold text-[#b30000]">&ldquo;Kiến tạo không gian – Dựng xây giá trị bền vững&rdquo;</span>, chúng tôi chú trọng tối ưu công năng và thẩm mỹ,
              đảm bảo tính bền vững nhằm mang đến giá trị lâu dài cho từng dự án.
            </p>
            <p>
              Chúng tôi luôn đồng hành cùng khách hàng từ ý tưởng đến hoàn thiện với đội ngũ kiến trúc sư và kỹ sư giàu kinh nghiệm, tận tâm trong từng hạng mục thi công.
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-[280px] sm:max-w-[320px] items-center justify-center">
            <div className="relative aspect-[3/5] w-full">
              <Image
                src="/vietnam.png"
                alt="Bản đồ phân bố dự án LCK Việt"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 60vw, 320px"
                priority
              />
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[240px] sm:max-w-[260px] flex-col gap-4 sm:gap-5 text-left">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="flex items-baseline justify-start gap-3 sm:gap-4 border-b border-[#ededed] pb-3 sm:pb-4 last:border-none last:pb-0">
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span 
                    className={`text-2xl sm:text-3xl md:text-4xl font-black transition-all duration-500 ${stat.accent} ${
                      isBouncing[index] ? 'animate-bounce' : ''
                    }`}
                  >
                    {isVisible ? animatedStats[index] : 0}
                  </span>
                  <span 
                    className={`text-lg sm:text-xl md:text-2xl font-bold transition-all duration-500 ${stat.accent} ${
                      isBouncing[index] ? 'animate-pulse' : ''
                    }`}
                  >
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
