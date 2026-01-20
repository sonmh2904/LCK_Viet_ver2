"use client"

interface QuotationItem {
  id: number
  stt: string
  tenCongViec: string
  donVi: string
  soLuong: number
  donGia: number
  thanhTien: number
  ghiChu?: string
}

interface QuotationTableProps {
  title: string
  items: QuotationItem[]
  showTotal?: boolean
}

export function QuotationTable({ title, items, showTotal = true }: QuotationTableProps) {
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.thanhTien, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + " VNĐ"
  }

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
                Tên công việc
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Đơn vị
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Số lượng
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Đơn giá
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800 bg-orange-100">
                Thành tiền
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                Ghi chú
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
                  <span className="font-medium text-gray-800">{item.tenCongViec}</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                  {item.donVi}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                  {item.soLuong}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-right text-gray-700">
                  {formatCurrency(item.donGia)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-green-700">
                  {formatCurrency(item.thanhTien)}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-left text-gray-600 text-sm">
                  {item.ghiChu || "-"}
                </td>
              </tr>
            ))}
          </tbody>
          {showTotal && (
            <tfoot>
              <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold">
                <td 
                  colSpan={5} 
                  className="border border-gray-300 px-4 py-4 text-right text-lg"
                >
                  CỘNG:
                </td>
                <td className="border border-gray-300 px-4 py-4 text-right text-lg">
                  {formatCurrency(calculateTotal())}
                </td>
                <td className="border border-gray-300 px-4 py-3"></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Notes Section */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Ghi chú:</span> Giá trên chưa bao gồm VAT 10%
          </p>
          <p>
            <span className="font-semibold">Điều khoản:</span> 
            - Thanh toán theo tiến độ thi công
            - Bảo hành công trình theo quy định của nhà nước
            - Giá vật tư có thể thay đổi theo thị trường
          </p>
        </div>
      </div>
    </div>
  )
}

// Sample data for demonstration
export const sampleQuotationData: QuotationItem[] = [
  {
    id: 1,
    stt: "1",
    tenCongViec: "Sơn bột matit nội thất",
    donVi: "m²",
    soLuong: 150,
    donGia: 45000,
    thanhTien: 6750000,
    ghiChu: "Bao gồm 2 lớp matit, 1 lớp lót, 2 lớp sơn màu"
  },
  {
    id: 2,
    stt: "2",
    tenCongViec: "Sơn bột matit ngoại thất",
    donVi: "m²",
    soLuong: 80,
    donGia: 65000,
    thanhTien: 5200000,
    ghiChu: "Bao gồm 2 lớp matit, 1 lớp lót, 2 lớp sơn chống thấm"
  },
  {
    id: 3,
    stt: "3",
    tenCongViec: "Xử lý tường cũ, bóc sơn",
    donVi: "m²",
    soLuong: 230,
    donGia: 25000,
    thanhTien: 5750000,
    ghiChu: "Bóc sơn cũ, xử lý nứt, trét bột làm phẳng"
  },
  {
    id: 4,
    stt: "4",
    tenCongViec: "Sơn cửa gỗ",
    donVi: "cái",
    soLuong: 8,
    donGia: 350000,
    thanhTien: 2800000,
    ghiChu: "Chà nhám, sơn lót, sơn màu 2 lớp"
  },
  {
    id: 5,
    stt: "5",
    tenCongViec: "Sơn khung nhôm kính",
    donVi: "m",
    soLuong: 45,
    donGia: 85000,
    thanhTien: 3825000,
    ghiChu: "Sơn khung nhôm theo màu yêu cầu"
  },
  {
    id: 6,
    stt: "6",
    tenCongViec: "Bảo vệ đồ đạc, sàn nhà",
    donVi: "công",
    soLuong: 1,
    donGia: 1500000,
    thanhTien: 1500000,
    ghiChu: "Bao gồm bạt che, giấy dán sàn, di dời đồ đạc"
  }
]

export const sampleQuotationData2: QuotationItem[] = [
  {
    id: 1,
    stt: "1",
    tenCongViec: "Thi công trần thạch cao",
    donVi: "m²",
    soLuong: 120,
    donGia: 180000,
    thanhTien: 21600000,
    ghiChu: "Khung xương, tấm thạch cao, hệ chiếu sáng"
  },
  {
    id: 2,
    stt: "2",
    tenCongViec: "Vách ngăn thạch cao",
    donVi: "m²",
    soLuong: 35,
    donGia: 220000,
    thanhTien: 7700000,
    ghiChu: "Vách đơn, bao gồm vật tư và nhân công"
  },
  {
    id: 3,
    stt: "3",
    tenCongViec: "Ốp tường gạch men",
    donVi: "m²",
    soLuong: 25,
    donGia: 280000,
    thanhTien: 7000000,
    ghiChu: "Gạch men cao cấp, keo dán, chà ron"
  },
  {
    id: 4,
    stt: "4",
    tenCongViec: "Lát sàn gạch granite",
    donVi: "m²",
    soLuong: 85,
    donGia: 320000,
    thanhTien: 27200000,
    ghiChu: "Gạch granite 80x80cm, keo dán chuyên dụng"
  },
  {
    id: 5,
    stt: "5",
    tenCongViec: "Trang trí tường bằng giấy dán",
    donVi: "m²",
    soLuong: 40,
    donGia: 150000,
    thanhTien: 6000000,
    ghiChu: "Giấy dán tường cao cấp, keo dán chuyên dụng"
  }
]

// Vật liệu xây nhà trọn gói
export const sampleQuotationData3: QuotationItem[] = [
  {
    id: 1,
    stt: "1",
    tenCongViec: "Sắt thép",
    donVi: "tấn",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Hòa Phát, Việt Úc, Việt Đức"
  },
  {
    id: 2,
    stt: "2",
    tenCongViec: "Xi măng đổ Bê tông",
    donVi: "tấn",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Hoàng Thạch, Hoàng Long, Chinfon"
  },
  {
    id: 3,
    stt: "3",
    tenCongViec: "Xi măng Xây trát tường",
    donVi: "tấn",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Hoàng Thạch, Hoàng Long, hoặc dựa vào chủng loại vật tư tại địa phương"
  },
  {
    id: 4,
    stt: "4",
    tenCongViec: "Bê tông thương phẩm",
    donVi: "m³",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Bê tông Việt Hà, Việt Đức, Chèm Mác 250"
  },
  {
    id: 5,
    stt: "5",
    tenCongViec: "Cát đổ bê tông",
    donVi: "m³",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Cát hạt lớn"
  },
  {
    id: 6,
    stt: "6",
    tenCongViec: "Cát xây, trát tường",
    donVi: "m³",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Cát hạt lớn, hạt trung"
  },
  {
    id: 7,
    stt: "7",
    tenCongViec: "Gạch xây tường bao 4cm x 8cm x 18cm",
    donVi: "viên",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Gạch đặc M75"
  },
  {
    id: 8,
    stt: "8",
    tenCongViec: "Gạch xây tường ngăn phòng 4 cm x 8cm x 18cm",
    donVi: "viên",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Gạch lỗ M50"
  },
  {
    id: 9,
    stt: "9",
    tenCongViec: "Dây điện chiếu sáng",
    donVi: "cây",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Dây Trần Phú"
  },
  {
    id: 10,
    stt: "10",
    tenCongViec: "Dây cáp ti vi",
    donVi: "cây",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Cáp Sino"
  },
  {
    id: 11,
    stt: "11",
    tenCongViec: "Dây cáp mạng",
    donVi: "cây",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Cáp Sino"
  },
  {
    id: 12,
    stt: "12",
    tenCongViec: "Đế âm tường ống luồn dây điện",
    donVi: "cái",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Sino"
  },
  {
    id: 13,
    stt: "13",
    tenCongViec: "Đường ống lóng, lạnh âm tường",
    donVi: "cây",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Tiền Phong, Vesbo"
  },
  {
    id: 14,
    stt: "14",
    tenCongViec: "Đường thoát nước",
    donVi: "cây",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Ống PVC C1"
  },
  {
    id: 15,
    stt: "15",
    tenCongViec: "Hóa chất chống thấm sàn mái, nhà vệ sinh",
    donVi: "cái",
    soLuong: 1,
    donGia: 0,
    thanhTien: 0,
    ghiChu: "Sika Latex – TH, Membrane"
  }
]
