"use client"

interface DesignItem {
  id: number
  stt: string
  loaiCongTrinh: string
  kienTruc: string
  noiThat: string
  kienTrucVaNoiThat: string
}

interface DesignQuotationTableProps {
  title: string
  items: DesignItem[]
}

export function DesignQuotationTable({ title, items }: DesignQuotationTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
        <h3 className="text-xl font-bold text-center uppercase">{title}</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-50 border-b-2 border-orange-200">
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                STT
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                Loại công trình
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Kiến trúc
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Nội thất
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Kiến trúc & nội thất
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={item.id} 
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-green-50 transition-colors`}
              >
                <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                  {item.stt}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  <span className="font-medium text-gray-800">{item.loaiCongTrinh}</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                  {item.kienTruc}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                  {item.noiThat}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                  {item.kienTrucVaNoiThat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes Section */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Đơn vị:</span> VNĐ/m²
          </p>
          <p>
            <span className="font-semibold">Lưu ý:</span> Đơn giá trên là áp dụng cho các công trình thiết kế theo có độ cầu kỳ phức tạp trung bình. 
            Các công trình đòi hỏi mức độ chi tiết phức tạp và cầu kỳ cao cấp hơn, đơn giá sẽ thay đổi.
          </p>
        </div>
      </div>
    </div>
  )
}

// Sample data for design quotation
export const sampleDesignData: DesignItem[] = [
  {
    id: 1,
    stt: "1",
    loaiCongTrinh: "Căn hộ",
    kienTruc: "–",
    noiThat: "180,000",
    kienTrucVaNoiThat: "–"
  },
  {
    id: 2,
    stt: "2",
    loaiCongTrinh: "Nhà phố một mặt tiền",
    kienTruc: "100,000",
    noiThat: "180,000",
    kienTrucVaNoiThat: "250,000"
  },
  {
    id: 3,
    stt: "3",
    loaiCongTrinh: "Nhà phố hai mặt tiền",
    kienTruc: "100,000",
    noiThat: "180,000",
    kienTrucVaNoiThat: "270,000"
  },
  {
    id: 4,
    stt: "4",
    loaiCongTrinh: "Biệt thự",
    kienTruc: "120,000",
    noiThat: "200,000",
    kienTrucVaNoiThat: "320,000"
  },
  {
    id: 5,
    stt: "5",
    loaiCongTrinh: "Penthouse – Duplex",
    kienTruc: "–",
    noiThat: "250,000",
    kienTrucVaNoiThat: "–"
  },
  {
    id: 6,
    stt: "6",
    loaiCongTrinh: "Văn phòng – Showroom – Shop",
    kienTruc: "–",
    noiThat: "180,000",
    kienTrucVaNoiThat: "–"
  },
  {
    id: 7,
    stt: "7",
    loaiCongTrinh: "Nhà hàng – Cafe",
    kienTruc: "180,000",
    noiThat: "180,000",
    kienTrucVaNoiThat: "250,000"
  },
  {
    id: 8,
    stt: "8",
    loaiCongTrinh: "Sân vườn",
    kienTruc: "120,000",
    noiThat: "–",
    kienTrucVaNoiThat: "–"
  },
  {
    id: 9,
    stt: "9",
    loaiCongTrinh: "Khách sạn – Spa",
    kienTruc: "180,000",
    noiThat: "180,000",
    kienTrucVaNoiThat: "250,000"
  },
  {
    id: 10,
    stt: "10",
    loaiCongTrinh: "Nhà xưởng – công trình CN",
    kienTruc: "180,000",
    noiThat: "180,000",
    kienTrucVaNoiThat: "250,000"
  },
  {
    id: 11,
    stt: "11",
    loaiCongTrinh: "Công trình khác",
    kienTruc: "Liên hệ",
    noiThat: "",
    kienTrucVaNoiThat: ""
  }
]
