"use client"

import React from "react"
import { Phone, Mail, MapPin } from "lucide-react"

export function ContactFormSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <span className="inline-flex items-center rounded-full bg-[#b30000]/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000] mb-4">
              Liên hệ
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center">
              Thông tin liên hệ
            </h2>
          </div>

          <div className="space-y-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[#b30000]" />
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    172 phố Đại Từ, phường Định Công, thành phố Hà Nội
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-[#b30000]" />
                <a 
                  href="tel:0985304394" 
                  className="text-xl font-semibold text-gray-800 hover:text-[#b30000] transition-colors"
                >
                  0374.33.4444
                </a>
              </div>
              <p className="text-sm text-gray-500">Hotline tư vấn 24/7</p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <Mail className="h-6 w-6 text-[#b30000]" />
                <a 
                  href="mailto:kientruclckviet@gmail.vn" 
                  className="text-lg text-gray-800 hover:text-[#b30000] transition-colors"
                >
                  kientruclckviet@gmail.vn
                </a>
              </div>
              <p className="text-sm text-gray-500">Email liên hệ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}