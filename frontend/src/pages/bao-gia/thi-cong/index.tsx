"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"
import { QuotationTable, sampleQuotationData, sampleQuotationData2 } from "@/components/ui/quotation-table"
import { MaterialQuotationTable, sampleMaterialData, sampleFinishingData, sampleSanitaryData, sampleKitchenData, sampleStairsData, sampleTileData, sampleDoorData } from "@/components/ui/material-quotation-table"

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Khảo sát & Lên ý tưởng",
    description: "Đội ngũ kỹ sư đến tận nơi khảo sát, đo đạc và lắng nghe nhu cầu của khách hàng",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 01 3 16.382V5.618a1 1 0 011.447-.894L9 2m0 0l5.447 2.724A1 1 0 0116 5.618v10.764a1 1 0 01-.447.894L9 20m0 0V2m0 18l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 2m0 0l5.447 2.724A1 1 0 0116 5.618v10.764a1 1 0 01-.447.894L9 20" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Thiết kế & Báo giá",
    description: "Lên bản vẽ 2D, 3D và gửi báo giá chi tiết, minh bạch cho khách hàng duyệt",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-1m-6 0l4 4m0 0l-4-4m4 4v6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Ký kết & Thi công",
    description: "Kết hợp đồng, tiến hành thi công theo đúng bản vẽ đã được duyệt và tiến độ cam kết",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Nghiệm thu & Bàn giao",
    description: "Kiểm tra chất lượng, nghiệm thu với khách hàng và bàn giao công trình đúng cam kết",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0zm-9 2a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
]

export default function BaoGiaThiCongPage() {
  return (
    <div className="min-h-screen bg-[#fff8f7]">

      {/* Detailed Quotation Tables */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#b30000] mb-4">Báo giá thi công – LCK Việt</h2>
            <p className="text-lg text-[#2c1b1a]/70 max-w-2xl mx-auto">
              Bảng báo giá chi tiết cho các hạng mục thi công cụ thể
            </p>
          </div>

          <div className="space-y-8">
            <MaterialQuotationTable 
              title="BÁO GIÁ VẬT LIỆU XÂY NHÀ TRỌN GÓI" 
              items={sampleMaterialData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ VẬT LIỆU HOÀN THIỆN" 
              items={sampleFinishingData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ THIẾT BỊ VỆ SINH" 
              items={sampleSanitaryData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ TỦ BẾP" 
              items={sampleKitchenData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ CẦU THANG" 
              items={sampleStairsData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ THI CÔNG GẠCH ỐP LÁT" 
              items={sampleTileData} 
            />
            
            <MaterialQuotationTable 
              title="BÁO GIÁ CỬA VÀ KHUNG SẮT BẢO VỆ" 
              items={sampleDoorData} 
            />
          </div>
        </div>
      </section>

      {/* Process Steps */}
      {/* <section className="py-24 bg-gradient-to-br from-white to-[#fff8f7]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2c1b1a] mb-4">Quy trình thi công</h2>
            <p className="text-lg text-[#2c1b1a]/70 max-w-2xl mx-auto">
              LCK Việt thực hiện quy trình chuyên nghiệp, minh bạch và hiệu quả
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b30000]/10 to-[#f05123]/10 text-[#b30000]">
                      {step.icon}
                    </div>
                    {index < PROCESS_STEPS.length - 1 && (
                      <div className="absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-transparent via-[#f4b7aa]/50 to-transparent" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#2c1b1a] mb-3">{step.title}</h3>
                  <p className="text-sm text-[#2c1b1a]/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Quý vị lưu ý với phần báo giá thi công */}
      <section className="py-16 bg-gradient-to-br from-white to-[#fff8f7]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#b30000]">
            <h3 className="text-2xl font-bold text-[#b30000] mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Quý vị lưu ý với phần báo giá thi công
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  <span className="font-semibold">Báo giá xây nhà trọn gói chìa khóa trao tay trên</span> chưa bao gồm 10% thuế VAT. Chưa bao gồm nhân công và vật tư lắp đặt hệ thống điều hòa, các loại giường tủ.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  <span className="font-semibold">Đối với các công trình mà chúng tôi thi công xây nhà trọn gói chìa khóa trao tay,</span> sau khi hai bên cùng nhau thống nhất sẽ ký kết hợp đồng thiết kế quý vị sẽ tạm ứng trước 50% giá trị thiết kế và thanh toán nốt 50% số tiền còn lại sau khi hồ sơ thiết kế hoàn thành bàn giao cho Quý vị.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  Khi hoàn thành thi công xây dựng nhà theo hợp đồng đã ký kết với báo giá thi công niêm yết của công ty và khối lượng công việc theo đúng bản vẽ đã thiết kế đầy đủ chúng tôi sẽ trừ 50% số tiền thiết kế mà chúng tôi cam kết giảm trừ cho Quý vị vào lần thanh toán cuối cùng trước khi bàn giao công trình.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-[#fff8f7] to-orange-50 rounded-xl border border-orange-200">
              <p className="text-gray-700 leading-relaxed text-center">
                <span className="font-semibold text-[#b30000]">Bảng báo giá thi công xây nhà trọn gói</span> với những đơn giá vô cùng chi tiết, những sản phẩm và dịch vụ mà LCK Việt cung cấp luôn đảm bảo chất lượng và uy tín. Nếu quý khách hàng có thắc mắc xin vui lòng liên hệ để có được sự tư vấn cụ thể và tận tình nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Map Section */}
      <AboutMapSection />

      {/* Footer CTA Section */}
      <FooterCTASection />
    </div>
  )
}