"use client"

import { useState, useEffect } from "react"
import { getProvinces, Province } from "@/services/address/address.api"
import { addInformation, CreateInformationRequest } from "@/services/information/information.api"
import { ToastNotification } from "@/components/ui/toast/toast-notification"

import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"

const CONTACT_INFO = {
  companyName: "Công ty TNHH Đầu tư và Xây dựng LCK Việt",
  address: "172 phố Đại Từ, phường Đại Kim, quận Hoàng Mai, Hà Nội",
  phone: "0985.304.394",
  hotline: "0374.334.444",
  email: "kientruclckviet@gmail.vn",
}

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.9516336600533!2d105.8334684!3d20.9718875!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac57226f8f6b:0x4500e93184d4a341!2sNg.+172+P.+%C4%90%E1%BA%A1i+T%E1%BB%AB,+%C4%90%E1%BA%A1i+T%E1%BB%AB,+%C4%90%E1%BA%A1i+Kim,+Ho%C3%A0ng+Mai,+H%C3%A0+N%E1%BB%99i,+Vietnam!5e0!3m2!1svi!2s!4v1736679600000!5m2!1svi!2s"


export default function ContactPage() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<number>(0)
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    province: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" as "success" | "error" })

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces()
        setProvinces(data)
      } catch (error) {
        console.error("Error loading provinces:", error)
      }
    }
    fetchProvinces()
  }, [])

  const handleProvinceChange = (provinceCode: string) => {
    const code = parseInt(provinceCode)
    setSelectedProvince(code)
    setFormData(prev => ({
      ...prev,
      province: provinces.find(p => p.province_code === code)?.name || ""
    }))
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const selectedProvinceData = provinces.find(p => p.province_code === selectedProvince)
      
      const requestData: CreateInformationRequest = {
        fullName: formData.fullname,
        phoneNumber: formData.phone,
        province: selectedProvince > 0 && selectedProvinceData ? selectedProvinceData.name : undefined,
        description: formData.message || undefined
      }
      
      console.log("Sending data:", requestData)
      
      const response = await addInformation(requestData)
      
      // Parse the JSON response
      const responseData = await response.json()
      console.log("API Response:", responseData)
      
      if (responseData.code === 201) {
        setToast({ isVisible: true, message: "Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.", type: "success" })
        // Reset form
        setFormData({ fullname: "", phone: "", province: "", message: "" })
        setSelectedProvince(0)
      } else {
        setToast({ isVisible: true, message: responseData.message || "Có lỗi xảy ra. Vui lòng thử lại.", type: "error" })
      }
    } catch (error: unknown) {
      console.error("Error submitting form:", error)
      
      // Try to parse error response
      let errorMessage = "Có lỗi xảy ra. Vui lòng thử lại."
      if (error && typeof error === 'object' && 'response' in error) {
        try {
          const errorData = await (error as { response: { json(): Promise<{ message?: string }> } }).response.json()
          errorMessage = errorData.message || errorMessage
        } catch (parseError) {
          console.error("Error parsing error response:", parseError)
        }
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message?: string }).message || errorMessage
      }
      
      setToast({ isVisible: true, message: errorMessage, type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }
  return (
    <div className="bg-[#fff8f7] text-slate-900">
      <main className="mx-auto flex w-full flex-col gap-0">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8f7] via-white to-[#fff1ec] pb-32 pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(179,0,0,0.03),transparent_50%)]" />
          <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-[#f05123]/10 to-[#b30000]/5 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-96 w-96 rounded-full bg-gradient-to-tr from-[#b30000]/10 to-[#f05123]/5 blur-3xl" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-6">
            <header className="flex flex-col gap-6 text-center">
              <div className="mx-auto flex items-center gap-3 rounded-full bg-gradient-to-r from-[#b30000]/10 to-[#f05123]/10 px-6 py-2 border border-[#f4b7aa]/30 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-[#f05123] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#b30000]">Liên hệ</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.12em] bg-gradient-to-r from-[#2c1b1a] via-[#b30000] to-[#2c1b1a] bg-clip-text text-transparent leading-tight">
                Kết nối cùng LCK Việt
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 font-medium">
                Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong mọi hạng mục thiết kế, thi công kiến trúc – nội thất.
                <br className="hidden md:block" />
                Liên hệ ngay để được tư vấn chi tiết và nhận báo giá nhanh chóng.
              </p>
            </header>

            <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-10">
                <div className="rounded-[40px] bg-gradient-to-br from-white/95 to-white/80 p-10 shadow-2xl border border-[#f4b7aa]/30 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b30000]/15 to-[#f05123]/10 text-[#b30000] shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#b30000]">Liên hệ trực tiếp</p>
                      <p className="mt-1 text-xl font-bold text-[#2c1b1a]">{CONTACT_INFO.companyName}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#fff8f7] to-[#fff1ec] border border-[#f4b7aa]/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b30000]/10 text-[#b30000] flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b30000] mb-1">Địa chỉ</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{CONTACT_INFO.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#fff8f7] to-[#fff1ec] border border-[#f4b7aa]/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b30000]/10 text-[#b30000] flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b30000] mb-1">Điện thoại</p>
                        <p className="text-sm text-slate-700">{CONTACT_INFO.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#fff8f7] to-[#fff1ec] border border-[#f4b7aa]/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b30000]/10 text-[#b30000] flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b30000] mb-1">Hotline</p>
                        <p className="text-sm text-slate-700">{CONTACT_INFO.hotline}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#fff8f7] to-[#fff1ec] border border-[#f4b7aa]/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b30000]/10 text-[#b30000] flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#b30000] mb-1">Email</p>
                        <p className="text-sm text-slate-700">{CONTACT_INFO.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-[#f4b7aa]/30 shadow-2xl">
                  <div className="relative h-[300px]">
                    <iframe 
                      title="Bản đồ LCK Việt" 
                      src={MAP_SRC} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      className="rounded-[32px]"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="rounded-[40px] bg-gradient-to-br from-white/95 to-white/80 p-10 shadow-2xl border border-[#f4b7aa]/30 backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f05123]/15 to-[#b30000]/10 text-[#f05123] shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-8 w-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#f05123]">Đăng ký tư vấn thiết kế</p>
                      <p className="mt-1 text-xl font-bold text-[#2c1b1a]">Nhận phản hồi trong 24 giờ</p>
                    </div>
                  </div>

                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#2c1b1a] mb-2">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullname"
                          placeholder="Nguyễn Văn A"
                          value={formData.fullname}
                          onChange={(e) => handleInputChange("fullname", e.target.value)}
                          className="w-full rounded-2xl border border-[#f4b7aa]/30 bg-gradient-to-br from-white/90 to-white/80 px-5 py-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#b30000]/60 focus:ring-2 focus:ring-[#b30000]/20 focus:bg-white/95 shadow-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#2c1b1a] mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="0985 304 394"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full rounded-2xl border border-[#f4b7aa]/30 bg-gradient-to-br from-white/90 to-white/80 px-5 py-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#b30000]/60 focus:ring-2 focus:ring-[#b30000]/20 focus:bg-white/95 shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#2c1b1a] mb-2">
                          Tỉnh/Thành phố <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={selectedProvince}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                          className="w-full rounded-2xl border border-[#f4b7aa]/30 bg-gradient-to-br from-white/90 to-white/80 px-5 py-4 text-base text-slate-700 outline-none transition-all duration-300 focus:border-[#b30000]/60 focus:ring-2 focus:ring-[#b30000]/20 focus:bg-white/95 appearance-none cursor-pointer"
                          required
                        >
                          <option value={0}>Chọn tỉnh/thành phố</option>
                          {provinces.map((province) => (
                            <option key={province.province_code} value={province.province_code}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-[#2c1b1a] mb-2">
                        Nội dung cần tư vấn <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        placeholder="Mô tả ý tưởng, ngân sách dự kiến,..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="w-full rounded-2xl border border-[#f4b7aa]/30 bg-gradient-to-br from-white/90 to-white/80 px-5 py-4 text-base text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#b30000]/60 focus:ring-2 focus:ring-[#b30000]/20 focus:bg-white/95 resize-none shadow-sm"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500">
                        <span className="text-red-500">*</span> Thông tin bắt buộc. Chúng tôi bảo mật dữ liệu và chỉ sử dụng để tư vấn dự án của bạn.
                      </p>
                      <p className="text-sm text-slate-400">
                        Phản hồi trong vòng 24 giờ
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#b30000] via-[#f05123] to-[#b30000] py-4 text-base font-bold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#b30000]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutMapSection />
        <FooterCTASection />
      </main>
      
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  )
}
