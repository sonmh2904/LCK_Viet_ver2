"use client"

import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"
import { DesignQuotationTable, sampleDesignData } from "@/components/ui/design-quotation-table"

export default function BaoGiaThietKePage() {
  return (
    <div className="min-h-screen bg-[#fff8f7]">

      {/* Detailed Quotation Tables */}
      <section className="py-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#b30000] mb-4">Báo giá thiết kế – LCK Việt</h2>
            <p className="text-lg text-[#2c1b1a]/70 max-w-2xl mx-auto">
              Bảng báo giá chi tiết cho các loại hình công trình thiết kế
            </p>
          </div>

          {/* Gói Thiết Kế Kiến Trúc */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#b30000]">
              <h3 className="text-2xl font-bold text-[#b30000] mb-6 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                GÓI THIẾT KẾ KIẾN TRÚC bao gồm:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Phối cảnh 3D mặt tiền, Phối cảnh 3D ngoại thất</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Mặt bằng bố trí vật dụng các tầng</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Mặt cắt, mặt đứng công trình</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Hồ sơ triển khai chi tiết kết cấu công trình</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Chi tiết móng, dầm, sàn, cột, thang, đà, mái, ban công, sê nô...</span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Bản vẽ hệ thống cung cấp điện theo khu vực</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Chi tiết theo mục đích và công suất sử dụng điện</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Bản vẽ hệ thống chiếu sáng cơ bản theo khu vực</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Bản vẽ hệ thống dây tín hiệu Tvi, Cable, Internet, Camera, Điện thoại...</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                    <span>Thiết kế sân vườn được tính theo hệ số 50% diện tích</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <DesignQuotationTable 
              title="BÁO GIÁ THIẾT KẾ KIẾN TRÚC – NỘI THẤT" 
              items={sampleDesignData} 
            />
          </div>
        </div>
      </section>

      {/* Bảng Chi Tiết Thiết Kế Nhà Phố – Biệt Thự */}
      <section className="py-16 bg-gradient-to-br from-white to-[#fff8f7]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#b30000] mb-8 text-center">
              Bảng Chi Tiết Thiết Kế Nhà Phố – Biệt Thự
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-50 border-b-2 border-orange-200">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                      Nội dung công việc
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                      Thiết kế nhà phố
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                      Thiết kế biệt thự
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-orange-100 font-bold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-center text-[#b30000]">
                      I. THỜI GIAN THIẾT KẾ
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Tổng thời gian thiết kế</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">30 ngày</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">30 ngày</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Thời gian lập hồ sơ sơ bộ</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">10 ngày</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">10 ngày</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Thời gian lập hồ sơ kỹ thuật thi công</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">15 ngày</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">15 ngày</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-center text-gray-800">
                      II. THÀNH PHẦN HỒ SƠ
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ phối cảnh mặt tiền</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">15 ngày</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">15 ngày</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ kiến trúc cơ bản (Các mặt triển khai)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ kiến trúc mở rộng (Mặt bằng trần, sàn)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ nội thất(mặt bằng bố trí nội thất)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ phối cảnh nội thất toàn nhà (Sơ bộ)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ kỹ thuật thi công phần nội thất</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Phối cảnh sân vườn</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Cổng, tường rào và các hệ thống kỹ thuật hạ tầng</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Bể nước hòn non bộ</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Sân, đường đi dạo, giao thông nội bộ</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Bồn cỏ cây trang trí</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Đèn và các chi tiết trang trí phụ trợ</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ chi tiết các màng trang trí (Design theo chiều đứng)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ chi tiết cấu tạo (Kỹ thuật chi tiết công trình)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ kết cấu (Triển khai kết cấu móng, dầm, sàn…)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Các bộ hồ sơ kỹ thuật khác (Điện, điện thoại, chống sét, cấp thoát nước )</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-left">Dự toán thi công (Liệt kê khối lượng, đơn giá, thành tiền các hạng mục)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-left">Giám sát tác giả (Giải đáp các thắc mắc, sửa lỗi hồ sơ khi thi công )</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">✓</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-center text-gray-800">
                      III. DỊCH VỤ KÈM THEO
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-left">
                      <ul className="space-y-2">
                        <li>• Thủ tục xin phép xây dựng nhà phố giá từ 6 đến 8 triệu</li>
                        <li>• Thủ tục hoàn công công trình giá tùy theo từng công trình</li>
                        <li>• Tư vấn lựa chọn vật liệu xây dựng, trang trí nội ngoại thất</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Lưu ý */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#b30000]">
            <h3 className="text-2xl font-bold text-[#b30000] mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              LƯU Ý
            </h3>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  Đơn giá trên là áp dụng cho các công trình thiết kế theo có độ cầu kỳ phức tạp trung bình. 
                  Các công trình đòi hỏi mức độ chi tiết phức tạp và cầu kỳ cao cấp hơn, đơn giá sẽ thay đổi căn cứ vào yêu cầu của chủ đầu tư.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  Các công trình có diện tích thiết kế lớn, phí thiết kế sẽ căn cứ vào tổng giá trị xây dựng công trình nhân với 2-3%
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  Đối với các loại công trình đặc biệt xin vui lòng liên hệ với LCK Việt để có đơn giá chính xác và hợp lý.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                <p className="leading-relaxed">
                  Đơn giá trên chỉ áp dụng với các công trình có diện tích lớn hơn 100m². Với các công trình có tổng diện tích thiết kế nhỏ hơn 100m², hai bên sẽ trao đổi và thống nhất chi phí thiết kế.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thành Phần Hồ Sơ */}
      <section className="py-16 bg-gradient-to-br from-white to-[#fff8f7]">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#b30000] mb-8 text-center">
              B. THÀNH PHẦN HỒ SƠ
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-50 border-b-2 border-orange-200">
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                      STT
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                      TÊN TÀI LIỆU
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                      SỐ BỘ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-orange-100 font-bold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-center text-[#b30000]">
                      I.PHẦN THIẾT KẾ KỸ THUẬT THI CÔNG
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">01</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Phối cảnh màu ngoại thất</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Các bản vẽ kỹ thuật</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">03</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế Kiến trúc (bản vẽ mặt bằng các tầng, mặt đứng, mặt cắt, chi tiết kiến trúc)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">04</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống điện, chiếu sáng.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">05</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống cấp nước, thoát nước mưa và nước sinh hoạt</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">06</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống điện lạnh.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">07</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống phòng truyền hình cable.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">08</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống điện thoại.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">09</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống pccc( Nếu có )</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">10</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế hệ thống Internet.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">11</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Thiết kế kết cấu từ móng tới mái</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td colSpan={3} className="border border-gray-300 px-4 py-3 text-center text-[#b30000]">
                      II.TRANG TRÍ NỘI THẤT
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">01</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Phối cảnh nội thất từng phòng (3D, màu sắc, ánh sáng)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ chi tiết trang trí (Bản vẽ thi công)</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3 text-center">03</td>
                    <td className="border border-gray-300 px-4 py-3 text-left">Hồ sơ chi tiết bàn ghế, tủ, kệ,…</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">02</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Hình thức hồ sơ và các vấn đề lưu ý */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#b30000]">
              <h3 className="text-xl font-bold text-[#b30000] mb-6">C. Hình thức hồ sơ</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>Hồ sơ thiết kế đóng gáy khổ A3 hoặc A4 dùng thi công (Tùy công trình)- 01 bộ.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>Phối cảnh 3D dàn trang theo từng khu vực.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>1 bộ hồ sơ lưu trữ + đĩa video trọn bộ hồ sơ thiết kế (đối với nhà biệt thự xây mới).</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-[#b30000]">
              <h3 className="text-xl font-bold text-[#b30000] mb-6">D. Các vấn đề lưu ý</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>Tư vấn thiết kế và lên sơ bộ phương án mặt bằng cho khách hàng được triển khai rất kỹ trước khi về hoàn thiện công tác thiết kế.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>Báo giá thiết kế trên chưa bao gồm thuế giá trị gia tăng (VAT)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#b30000] mt-2 flex-shrink-0"></div>
                  <span>Trong trường hợp hai bên ký hợp đồng thi công nội thất, phí thiết kế tùy theo trường hợp sẽ có chế độ giảm giá đặc biệt.</span>
                </li>
              </ul>
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