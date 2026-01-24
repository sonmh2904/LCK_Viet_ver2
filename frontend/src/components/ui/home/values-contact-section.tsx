"use client"

import { CheckCircle2, ShieldCheck, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { getProvinces, Province } from "@/services/address/address.api"
import { addInformation, CreateInformationRequest } from "@/services/information/information.api"
import { ToastNotification } from "@/components/ui/toast/toast-notification"

const values = [
  {
    title: "Cam kết chất lượng",
    description: "Mỗi công trình được kiểm định đa tầng với quy chuẩn châu Âu và bảo hành rõ ràng.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Đồng hành trọn gói",
    description: "Đội ngũ LCK Việt theo sát từ ý tưởng, pháp lý đến thi công và bàn giao.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Ngân sách minh bạch",
    description: "Chi phí tối ưu, báo giá chi tiết, linh hoạt theo tiến độ và nhu cầu khách hàng.",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
]

export function ValuesContactSection() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [selectedProvince, setSelectedProvince] = useState<number>(0)
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    province: "",
    description: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Toast notification state
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error"
  })

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
    // Update form data with province name
    const province = provinces.find(p => p.province_code === code)
    setFormData(prev => ({
      ...prev,
      province: province?.name || ""
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.fullName.trim()) {
      showToast("Vui lòng nhập họ và tên", "error")
      return
    }
    if (!formData.phoneNumber.trim()) {
      showToast("Vui lòng nhập số điện thoại", "error")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Get province name properly
      const selectedProvinceData = provinces.find(p => p.province_code === selectedProvince)
      console.log("Province Debug:", {
        selectedProvince,
        selectedProvinceData,
        provincesLength: provinces.length,
        provinceName: selectedProvinceData?.name
      })
      
      const requestData: CreateInformationRequest = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        province: selectedProvince > 0 && selectedProvinceData ? selectedProvinceData.name : undefined,
        description: formData.description || undefined
      }
      
      console.log("Sending data:", requestData) // Debug log
      
      const response = await addInformation(requestData)
      
      // Parse the JSON response
      const responseData = await response.json()
      console.log("API Response:", responseData) // Debug log
      
      if (responseData.code === 201) {
        showToast("Gửi yêu cầu tư vấn thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.", "success")
        // Reset form
        setFormData({ fullName: "", phoneNumber: "", province: "", description: "" })
        setSelectedProvince(0)
      } else {
        showToast(responseData.message || "Có lỗi xảy ra. Vui lòng thử lại.", "error")
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
      
      showToast(errorMessage, "error")
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
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\' opacity=\'0.08\'%3E%3Cpath d=\'M80 0h80v80H80zM0 80h80v80H0z\' fill=\'%230066cc\'/%3E%3Cpath d=\'M0 0h80v80H0zM80 80h80v80H80z\' fill=\'%23b30000\'/%3E%3C/g%3E%3C/svg%3E')]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-red-400/85 to-red-800/80" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 lg:gap-12 px-4 sm:px-6 lg:flex-row">
        <div className="flex-1 space-y-6 sm:space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-[0.4em] text-white drop-shadow-lg">
            Vì sao chọn chúng tôi
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white drop-shadow-2xl">
            Cam kết từ LCK Việt cho công trình bền vững và khác biệt
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-white/95 drop-shadow-md">
            Chúng tôi không chỉ mang đến bản vẽ đẹp mắt, mà còn là giải pháp đồng hành trọng tâm, minh bạch, đảm bảo hiệu quả đầu tư và giá trị thẩm mỹ dài hạn.
          </p>
          <div className="space-y-4 sm:space-y-6">
            {values.map((value) => (
              <div key={value.title} className="flex gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md p-4 sm:p-5 border border-white/20">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-sm">
                  {value.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl sm:rounded-3xl bg-white/15 backdrop-blur-xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">Đăng ký tư vấn miễn phí</h3>
            <p className="mt-2 text-sm text-white/85 leading-relaxed drop-shadow-sm">
              Điền thông tin, đội ngũ LCK Việt sẽ liên hệ trong 24h để tư vấn giải pháp phù hợp nhất.
            </p>
            <form className="mt-4 sm:mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 drop-shadow-sm">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="mt-2 w-full rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 drop-shadow-sm">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="0826 231 333"
                  className="mt-2 w-full rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 drop-shadow-sm">
                  Địa chỉ
                </label>
                <div className="mt-2 grid gap-3">
                  <div className="relative">
                    <select
                      value={selectedProvince}
                      onChange={(e) => handleProvinceChange(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 text-white outline-none transition focus:border-white focus:ring-2 focus:ring-white/30 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      <option value={0} className="bg-[#d6301f] text-white">Chọn tỉnh/thành phố</option>
                      {provinces.map((province) => (
                        <option key={province.province_code} value={province.province_code} className="bg-[#d6301f] text-white">
                          {province.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white/70">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-[0.3em] text-white/80 drop-shadow-sm">
                  Nhu cầu chi tiết
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Mô tả ý tưởng, ngân sách dự kiến..."
                  className="mt-2 w-full rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-white py-3 text-base font-semibold text-[#cf1f1f] shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:bg-yellow-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    
    {/* Toast Notification */}
    <ToastNotification
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
    </section>
  )
}
