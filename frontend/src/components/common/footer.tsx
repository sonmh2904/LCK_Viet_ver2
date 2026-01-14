"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { getProvinces, getWardsByProvinceCode, Province, Ward } from "@/services/address/address.api"

const FACEBOOK_PAGE = "https://www.facebook.com/profile.php?id=100081223427193#"

export function Footer() {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState<number>(0)
  const [selectedWard, setSelectedWard] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    ward: "",
    province: "",
    message: "",
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

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedProvince > 0) {
        try {
          const data = await getWardsByProvinceCode(selectedProvince)
          setWards(data)
        } catch (error) {
          console.error("Error loading wards:", error)
        }
      } else {
        setWards([])
        setSelectedWard("")
      }
    }
    fetchWards()
  }, [selectedProvince])

  const handleProvinceChange = (provinceCode: string) => {
    const code = parseInt(provinceCode)
    setSelectedProvince(code)
    setSelectedWard("")
    setFormData(prev => ({
      ...prev,
      province: provinces.find(p => p.province_code === code)?.name || "",
      ward: ""
    }))
  }

  const handleWardChange = (wardName: string) => {
    setSelectedWard(wardName)
    setFormData(prev => ({
      ...prev,
      ward: wardName
    }))
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <footer className="relative z-10 bg-gradient-to-r from-blue-500 via-red-400 to-red-800 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffeede]">
              Về chúng tôi
            </p>
            <h3 className="text-2xl font-bold uppercase tracking-wide">Công ty TNHH Đầu tư và Xây dựng LCK Việt</h3>
            <p className="text-sm leading-relaxed text-white/90">
              LCK Việt là đơn vị tổng thầu thiết kế và thi công kiến trúc nội thất, đồng hành cùng khách hàng và đối tác trong các dự án nhà ở, văn phòng và thương mại.
            </p>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                <span>
                  Địa chỉ: 172 phố Đại Từ, phường Đại Kim, quận Hoàng Mai, thành phố Hà Nội<br />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                <span>Điện thoại: <a href="tel:0826231333" className="font-semibold underline underline-offset-4">0985.304.394</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                <span>Hotline: <a href="tel:0374334444" className="font-semibold underline underline-offset-4">0374.33.4444</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                <span>Email: <a href="mailto:contact@lckviet.vn" className="font-semibold underline underline-offset-4">kientruclckviet@gmail.vn</a></span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 rounded-[28px] bg-white/95 p-8 text-slate-700 shadow-[0_40px_70px_-35px_rgba(179,0,0,0.6)] ring-1 ring-white/40">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000]">
              Đăng ký nhận thông tin
            </p>
            <h3 className="text-xl font-bold uppercase tracking-wide text-[#b30000]">Nhận tư vấn & báo giá</h3>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Họ và Tên"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30"
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30"
              />
              
              <div className="grid gap-3">
                <div className="relative">
                  <select
                    value={selectedProvince}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30 appearance-none cursor-pointer"
                  >
                    <option value={0}>Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.province_code} value={province.province_code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select
                    value={selectedWard}
                    onChange={(e) => handleWardChange(e.target.value)}
                    disabled={selectedProvince === 0}
                    className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Chọn quận/huyện</option>
                    {wards.map((ward, index) => (
                      <option key={index} value={ward.ward}>
                        {ward.ward}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <textarea
                name="message"
                placeholder="Nội dung"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#f4b7aa] bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#b30000] focus:ring-2 focus:ring-[#b30000]/30"
              />
              <button
                type="button"
                className="w-full rounded-xl bg-gradient-to-r from-[#b30000] to-[#f05123] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0_12px_22px_-14px_rgba(179,0,0,0.75)] transition hover:brightness-110"
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#ffeede]">
              Facebook Fanpage
            </p>
            <h3 className="text-xl font-bold uppercase tracking-wide">Kết nối cùng chúng tôi</h3>
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/10 shadow-[0_22px_50px_-32px_rgba(0,0,0,0.72)]">
                <iframe
                  title="Facebook Fanpage LCK Việt"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_PAGE)}&tabs=timeline&width=340&height=180&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height="180"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/30">
                <iframe
                  title="Bản đồ LCK Việt"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3723.9516336600533!2d105.8334684!3d20.9718875!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac57226f8f6b:0x4500e93184d4a341!2sNg.+172+P.+%C4%90%E1%BA%A1i+T%E1%BB%AB,+%C4%90%E1%BA%A1i+T%E1%BB%AB,+%C4%90%E1%BA%A1i+Kim,+Ho%C3%A0ng+Mai,+H%C3%A0+N%E1%BB%99i,+Vietnam!5e0!3m2!1svi!2s!4v1736679600000!5m2!1svi!2s"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer