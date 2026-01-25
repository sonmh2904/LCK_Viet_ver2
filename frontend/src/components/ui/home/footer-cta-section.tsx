"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

const BRAND_LOGOS = [
  { src: "/brand/dulux.jpg", alt: "Dulux" },
  { src: "/brand/an-cuong.jpg", alt: "An Cường" },
  { src: "/brand/vinh-tuong.jpg", alt: "Vĩnh Tường" },
  { src: "/brand/xingfa.jpg", alt: "Xingfa" },
  { src: "/brand/rita_vo.jpg", alt: "Rita Võ" },
  { src: "/brand/logo-minh-long.jpg", alt: "Minh Long" },
  { src: "/brand/jotun.jpg", alt: "Jotun" },
  { src: "/brand/ecopark.jpg", alt: "Ecopark" },
  { src: "/brand/vinhome.jpg", alt: "Vinhomes" },
] as const

const ANIMATION_DURATION_PER_LOGO = 3

export function FooterCTASection() {
  const [isPaused, setIsPaused] = useState(false)
  const doubledLogos = useMemo(
    () => [...BRAND_LOGOS, ...BRAND_LOGOS],
    []
  )

  return (
    <section className="bg-white py-12 sm:py-16 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#f05123] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#b30000]">
              Đối tác
            </span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal bg-gradient-to-r from-[#b30000] to-[#8a0000] bg-clip-text text-transparent leading-snug text-center">
            LCK Việt hân hạnh đồng hành cùng các thương hiệu uy tín
          </h2>
        </div>

        <div
          className="relative mt-8 sm:mt-10 overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200 bg-white/95 shadow-lg shadow-red-900/10 backdrop-blur"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />

          <div
            className="flex w-max items-center gap-8 sm:gap-12 lg:gap-16 px-8 sm:px-12 lg:px-16 py-8 sm:py-10"
            style={{
              animation: `footer-marquee ${BRAND_LOGOS.length * ANIMATION_DURATION_PER_LOGO}s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {doubledLogos.map((brand, index) => (
              <div
                key={`${brand.alt}-${index}`}
                className="relative flex h-12 w-24 sm:h-16 sm:w-32 lg:h-20 lg:w-40 items-center justify-center opacity-80 transition duration-300 hover:opacity-100"
              >
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 128px, 160px"
                  priority={index < BRAND_LOGOS.length}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes footer-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
