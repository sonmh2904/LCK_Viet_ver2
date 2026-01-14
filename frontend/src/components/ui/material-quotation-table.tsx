"use client"

import { useState } from "react"

interface MaterialItem {
  id: number
  stt: string
  vatLieu: string
  goiCoBan: string
  goiKhac: string
  goiTot: string
}

interface MaterialQuotationTableProps {
  title: string
  items: MaterialItem[]
}

export function MaterialQuotationTable({ title, items }: MaterialQuotationTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
        <h3 className="text-xl font-bold text-center uppercase">{title}</h3>
      </div>

      {/* Pricing Header */}
      <div className="bg-orange-50 border-b-2 border-orange-200 p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="font-bold text-gray-800">Vật liệu xây nhà trọn gói</div>
          <div className="bg-white rounded-lg p-3 border border-orange-300">
            <div className="font-bold text-orange-600 mb-1">GÓI VẬT TƯ CƠ BẢN</div>
            <div className="text-sm text-gray-600">Nhà mái bằng</div>
            <div className="text-lg font-bold text-red-600">5.300.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Nhật</div>
            <div className="text-lg font-bold text-red-600">6.300.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Thái</div>
            <div className="text-lg font-bold text-red-600">6.850.000đ/m²</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-orange-300">
            <div className="font-bold text-orange-600 mb-1">GÓI VẬT TƯ KHÁ</div>
            <div className="text-sm text-gray-600">Nhà mái bằng</div>
            <div className="text-lg font-bold text-red-600">6.650.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Nhật</div>
            <div className="text-lg font-bold text-red-600">7.000.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Thái</div>
            <div className="text-lg font-bold text-red-600">7.500.000đ/m²</div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-orange-300">
            <div className="font-bold text-orange-600 mb-1">GÓI VẬT TƯ TỐT</div>
            <div className="text-sm text-gray-600">Nhà mái bằng</div>
            <div className="text-lg font-bold text-red-600">7.300.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Nhật</div>
            <div className="text-lg font-bold text-red-600">8.000.000đ/m²</div>
            <div className="text-sm text-gray-600">Nhà mái Thái</div>
            <div className="text-lg font-bold text-red-600">8.500.000đ/m²</div>
          </div>
        </div>
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
                Vật liệu xây nhà trọn gói
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                GÓI VẬT TƯ CƠ BẢN
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                GÓI VẬT TƯ KHÁ
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800 bg-orange-100">
                GÓI VẬT TƯ TỐT
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
                  <span className="font-medium text-gray-800">{item.vatLieu}</span>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-left text-gray-700">
                  {item.goiCoBan}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-left text-gray-700">
                  {item.goiKhac}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-left text-gray-700">
                  {item.goiTot}
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
            <span className="font-semibold">Ghi chú:</span> 
            - Giá trên chưa bao gồm VAT 10%
            - Giá đã bao gồm chi phí vận chuyển và nhân công thi công
            - Vật tư có thể thay đổi tùy theo điều kiện thực tế tại công trường
          </p>
          <p>
            <span className="font-semibold">Bảo hành:</span> 
            - Bảo hành kết cấu 10 năm
            - Bảo hành chống thấm 5 năm
            - Bảo hành kỹ thuật 2 năm
          </p>
        </div>
      </div>
    </div>
  )
}

// Sample data for material quotation
export const sampleMaterialData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Sắt thép",
    goiCoBan: "Hòa Phát, Việt Úc, Việt Đức",
    goiKhac: "Hòa Phát, Việt Úc, Việt Đức",
    goiTot: "Hòa Phát, Việt Úc, Việt Đức"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Xi măng đổ Bê tông",
    goiCoBan: "Hoàng Thạch, Hoàng Long, Chinfon",
    goiKhac: "Hoàng Thạch, Hoàng Long, Chinfon",
    goiTot: "Hoàng Thạch, Hoàng Long, Chinfon"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Xi măng Xây trát tường",
    goiCoBan: "Hoàng Thạch, Hoàng Long, hoặc dựa vào chủng loại vật tư tại địa phương",
    goiKhac: "Hoàng Thạch, Hoàng Long, hoặc dựa vào chủng loại vật tư tại địa phương",
    goiTot: "Hoàng Thạch, Hoàng Long, hoặc dựa vào chủng loại vật tư tại địa phương"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Bê tông thương phẩm",
    goiCoBan: "Bê tông Việt Hà, Việt Đức, Chèm Mác 250",
    goiKhac: "Bê tông Việt Hà, Việt Đức, Chèm Mác 250",
    goiTot: "Bê tông Việt Hà, Việt Đức, Chèm Mác 250"
  },
  {
    id: 5,
    stt: "5",
    vatLieu: "Cát đổ bê tông",
    goiCoBan: "Cát hạt lớn",
    goiKhac: "Cát hạt lớn",
    goiTot: "Cát hạt lớn"
  },
  {
    id: 6,
    stt: "6",
    vatLieu: "Cát xây, trát tường",
    goiCoBan: "Cát hạt lớn, hạt trung",
    goiKhac: "Cát hạt lớn, hạt trung",
    goiTot: "Cát hạt lớn, hạt trung"
  },
  {
    id: 7,
    stt: "7",
    vatLieu: "Gạch xây tường bao 4cm x 8cm x 18cm",
    goiCoBan: "Gạch đặc M75",
    goiKhac: "Gạch đặc M75",
    goiTot: "Gạch đặc M75"
  },
  {
    id: 8,
    stt: "8",
    vatLieu: "Gạch xây tường ngăn phòng 4 cm x 8cm x 18cm",
    goiCoBan: "Gạch lỗ M50",
    goiKhac: "Gạch lỗ M50",
    goiTot: "Gạch lỗ M50"
  },
  {
    id: 9,
    stt: "9",
    vatLieu: "Dây điện chiếu sáng",
    goiCoBan: "Dây Trần Phú…",
    goiKhac: "Dây Trần Phú…",
    goiTot: "Dây Trần Phú…"
  },
  {
    id: 10,
    stt: "10",
    vatLieu: "Dây cáp ti vi",
    goiCoBan: "Cáp Sino…",
    goiKhac: "Cáp Sino…",
    goiTot: "Cáp Panasonic.."
  },
  {
    id: 11,
    stt: "11",
    vatLieu: "Dây cáp mạng",
    goiCoBan: "Cáp Sino…",
    goiKhac: "Cáp Sino…",
    goiTot: "Cáp Panasonic.."
  },
  {
    id: 12,
    stt: "12",
    vatLieu: "Đế âm tường ống luồn dây điện",
    goiCoBan: "Sino…",
    goiKhac: "Sino…",
    goiTot: "Panasonic…"
  },
  {
    id: 13,
    stt: "13",
    vatLieu: "Đường ống lóng, lạnh âm tường",
    goiCoBan: "Tiền Phong, Vesbo…",
    goiKhac: "Tiền Phong, Vesbo…",
    goiTot: "Tiền Phong, Vesbo…"
  },
  {
    id: 14,
    stt: "14",
    vatLieu: "Đường thoát nước",
    goiCoBan: "Ống PVC C1",
    goiKhac: "Ống PVC C1",
    goiTot: "Ống PVC C1"
  },
  {
    id: 15,
    stt: "15",
    vatLieu: "Hóa chất chống thấm sàn mái, nhà vệ sinh",
    goiCoBan: "Sika Latex – TH, Membrane",
    goiKhac: "Sika Latex – TH, Membrane",
    goiTot: "Sika Latex – TH, Membrane"
  }
]

// Vật liệu hoàn thiện
export const sampleFinishingData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Sơn nội thất",
    goiCoBan: "Maxilite",
    goiKhac: "Jotun",
    goiTot: "Dulux"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Sơn ngoại thất",
    goiCoBan: "Joton",
    goiKhac: "Jotun",
    goiTot: "Dulux"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Sơn dầu, sơn chống dỉ",
    goiCoBan: "Expo",
    goiKhac: "Joton",
    goiTot: "Joton"
  },
  {
    id: 4,
    stt: "1",
    vatLieu: "Thiết bị công tác, ổ cắm",
    goiCoBan: "Sino",
    goiKhac: "Sino",
    goiTot: "Panasonic"
  },
  {
    id: 5,
    stt: "2",
    vatLieu: "Bóng đèn chiếu sáng phòng khách, phòng ngủ và bếp",
    goiCoBan: "Đèn Pilips 600.000đ/phòng",
    goiKhac: "Đèn Pilips 850.000đ/phòng",
    goiTot: "Đèn Pilips 1.300.000đ/phòng"
  },
  {
    id: 6,
    stt: "3",
    vatLieu: "Bóng đèn chiếu sáng phòng vệ sinh",
    goiCoBan: "Đèn Pilips 200.000đ/phòng",
    goiKhac: "Đèn Pilips 350.000đ/phòng",
    goiTot: "Đèn Pilips 500.000đ/phòng"
  },
  {
    id: 7,
    stt: "4",
    vatLieu: "Đèn trang trí phòng khách",
    goiCoBan: "0",
    goiKhac: "Đơn giá 650.000đ",
    goiTot: "Đơn giá 1.250.000đ"
  },
  {
    id: 8,
    stt: "5",
    vatLieu: "Đèn ban công",
    goiCoBan: "Đơn giá 160.000đ",
    goiKhac: "Đơn giá 380.000đ",
    goiTot: "Đơn giá 850.000đ"
  },
  {
    id: 9,
    stt: "6",
    vatLieu: "Đèn cầu thang",
    goiCoBan: "Đơn giá 180.000đ",
    goiKhac: "Đơn giá 380.000đ",
    goiTot: "Đơn giá 850.000đ"
  },
  {
    id: 10,
    stt: "7",
    vatLieu: "Đèn ngủ",
    goiCoBan: "0",
    goiKhac: "Đơn giá 480.000đ",
    goiTot: "Đơn giá 1.000.000đ"
  }
]

// Thiết bị vệ sinh
export const sampleSanitaryData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Bồn cầu vệ sinh",
    goiCoBan: "Inax – casar: 1.800.000đ/bộ",
    goiKhac: "Inax – casar – TOTO 3.200.000đ/bộ",
    goiTot: "Inax – casar – TOTO 4.500.000đ/bộ"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Labo rửa mặt",
    goiCoBan: "Inax – casar: 900.000đ/bộ",
    goiKhac: "Inax – casar – TOTO 900.000đ/bộ",
    goiTot: "Inax – casar – TOTO 2.200.000đ/bộ"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Phụ kiện labo",
    goiCoBan: "Đơn giá 750.000đ/bộ",
    goiKhac: "Đơn giá 1.100.000đ/bộ",
    goiTot: "Đơn giá 2.500.000đ/bộ"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Vòi rửa Labo",
    goiCoBan: "INAX Đơn giá 750.000đ/bộ",
    goiKhac: "INAX Đơn giá 1.350.000đ/bộ",
    goiTot: "INAX Đơn giá 2.000.000đ/bộ"
  },
  {
    id: 5,
    stt: "5",
    vatLieu: "Sen tắm",
    goiCoBan: "INAX Đơn giá 950.000đ/bộ",
    goiKhac: "INAX Đơn giá 1.350.000đ/bộ",
    goiTot: "INAX Đơn giá 2.650.000đ/bộ"
  },
  {
    id: 6,
    stt: "6",
    vatLieu: "Vòi sịt vệ sinh",
    goiCoBan: "Đợn giá : 150.000đ/bộ",
    goiKhac: "Đợn giá : 250.000đ/bộ",
    goiTot: "Đợn giá : 350.000đ/bộ"
  },
  {
    id: 7,
    stt: "7",
    vatLieu: "Gương soi nhà vệ sinh",
    goiCoBan: "Đợn giá : 190.000đ/bộ",
    goiKhac: "Đợn giá : 290.000đ/bộ",
    goiTot: "Gương Bỉ"
  },
  {
    id: 8,
    stt: "8",
    vatLieu: "Phụ kiện 7 món",
    goiCoBan: "Inox đơn giá: 700.000đ",
    goiKhac: "Inox đơn giá: 1.200.000đ",
    goiTot: "Inox đơn giá: 2.000.000đ"
  },
  {
    id: 9,
    stt: "9",
    vatLieu: "Máy bơm nước",
    goiCoBan: "Đơn giá: 1.250.000đ",
    goiKhac: "Đơn giá: 1.250.000đ",
    goiTot: "Đơn giá: 1.250.000đ"
  },
  {
    id: 10,
    stt: "10",
    vatLieu: "Bồn nước Sơn Hà",
    goiCoBan: "1500 lít",
    goiKhac: "1500 lít",
    goiTot: "1500 lít"
  }
]

// Tủ bếp
export const sampleKitchenData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Tủ gỗ trên",
    goiCoBan: "MDF",
    goiKhac: "HDF",
    goiTot: "Sồi Nga"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Tủ bếp dưới",
    goiCoBan: "Cánh tủ MDF",
    goiKhac: "Cánh tủ MDF",
    goiTot: "Cánh tủ sồi nga"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Mặt đá bàn bếp",
    goiCoBan: "Đá Hoa cương màu đen ba gian",
    goiKhac: "Đá Hoa cương màu đen ba gian",
    goiTot: "Đá Hoa cương Kim Sa hoặc tương đương"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Chậu rửa",
    goiCoBan: "Inox đơn giá: 1.150.000đ/bộ",
    goiKhac: "Inox đơn giá: 1.450.000đ/bộ",
    goiTot: "Inox đơn giá: 3.800.000đ/bộ"
  },
  {
    id: 5,
    stt: "5",
    vatLieu: "Vòi rửa nóng lạnh",
    goiCoBan: "Inax đơn giá: 750.000đ/bộ",
    goiKhac: "Inax đơn giá: 1.200.000đ/bộ",
    goiTot: "Inax đơn giá: 2.800.000đ/bộ"
  }
]

// Cầu thang
export const sampleStairsData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Đá cầu thang",
    goiCoBan: "Đá Hoa cương màu đen ba gian",
    goiKhac: "Đá hoa cương đen Huế",
    goiTot: "Đá Hoa cương Kim Sa hoặc tương đương 1.400.000đ/m2"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Tay vịn cầu thang",
    goiCoBan: "Lim Nam Phi KT 8 x 8cm 400.000đ/md",
    goiKhac: "Lim Nam Phi KT 8 x 8cm 400.000đ/md",
    goiTot: "Lim Nam Phi KT 8 x 8cm 400.000đ/md"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Trụ cầu thang",
    goiCoBan: "Trụ gỗ sồi đơn giá 1.300.000đ/cái",
    goiKhac: "Trụ gỗ căm xe đơn giá 1.800.000đ/cái",
    goiTot: "Trụ gỗ Lim Nam Phi đơn giá 2.800.000đ/cái"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Lan can cầu thang",
    goiCoBan: "Lan can sắt 450.000đ/md",
    goiKhac: "Trụ inox, kính cường lực",
    goiTot: "Trụ inox, kính cường lực"
  },
  {
    id: 5,
    stt: "5",
    vatLieu: "Giếng trời, ô lấy sáng khu cầu thang",
    goiCoBan: "Khung sắt bảo vệ sắt hộp 4x2cm. KT A150x150cm tấm lấy sáng Polycarbonate",
    goiKhac: "Khung sắt bảo vệ sắt hộp 4x2cm. KT A150x150cm tấm lấy sáng kính cường lực",
    goiTot: "Khung sắt bảo vệ sắt hộp 4x2cm. KT A150x150cm tấm lấy sáng kính cường lực"
  }
]

// Gạch ốp lát
export const sampleTileData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Gạch lát nền nhà",
    goiCoBan: "180.000đ/m² : Nice…",
    goiKhac: "220.000đ/m² Tasa…",
    goiTot: "305.000đ/m²:  Prime , Viglacera…"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Gạch lát nền phòng WC và ban công",
    goiCoBan: "125.000đ/m² Nice…",
    goiKhac: "135.000đ/m² Tasa…",
    goiTot: "205.000đ/m²: Prime , Viglacera…"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Gạch ốp tường nhà WC",
    goiCoBan: "160.000đ/m² Nice…",
    goiKhac: "190.000đ/m² Tasa…",
    goiTot: "225.000đ/m²: Prime , Viglacera…"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Gạch ốp len chân tường",
    goiCoBan: "Gạch cắt cùng loại lát nền nhà chiều cao 12cm",
    goiKhac: "Gạch cắt cùng loại lát nền nhà chiều cao 12cm",
    goiTot: "Gạch cắt cùng loại lát nền nhà chiều cao 12cm"
  }
]

// Cửa và khung sắt bảo vệ
export const sampleDoorData: MaterialItem[] = [
  {
    id: 1,
    stt: "1",
    vatLieu: "Cửa cổng",
    goiCoBan: "Sắt hộp khung bao 1.250.000đ/m²",
    goiKhac: "Sắt hộp khung bao 1.450.000đ/m²",
    goiTot: "Sắt hộp khung bao 1.700.000đ/m²"
  },
  {
    id: 2,
    stt: "2",
    vatLieu: "Cửa chính tầng trệt 01 bộ",
    goiCoBan: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiKhac: "Cửa nhôm kính Xingfa",
    goiTot: "Cửa nhôm kính Xingfa"
  },
  {
    id: 3,
    stt: "3",
    vatLieu: "Cửa đi ban công",
    goiCoBan: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiKhac: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiTot: "Cửa nhôm kính Xingfa"
  },
  {
    id: 4,
    stt: "4",
    vatLieu: "Cửa sổ",
    goiCoBan: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiKhac: "Cửa nhôm kính Việt Pháp hệ 4400",
    goiTot: "Cửa nhôm kính Xingfa"
  },
  {
    id: 5,
    stt: "5",
    vatLieu: "Cửa thông phòng",
    goiCoBan: "MDF",
    goiKhac: "HDF",
    goiTot: "Gỗ Lim Nam Phi"
  },
  {
    id: 6,
    stt: "6",
    vatLieu: "Cửa nhà vệ sinh",
    goiCoBan: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiKhac: "Cửa nhôm kính Việt Pháp hệ 4500",
    goiTot: "Gỗ Lim Nam Phi"
  },
  {
    id: 7,
    stt: "7",
    vatLieu: "Khung sắt bảo vệ cửa sổ",
    goiCoBan: "Sắt hộp 16x16mm A12cmx12cm",
    goiKhac: "Sắt hộp 16x16mm A12cmx12cm",
    goiTot: "Sắt hộp 16x16mm A12cmx12cm"
  },
  {
    id: 8,
    stt: "8",
    vatLieu: "Ổ khóa cửa thông phòng, khóa núm",
    goiCoBan: "Đơn giá 160.000đ/bộ",
    goiKhac: "Đơn giá 300.000đ/bộ",
    goiTot: "Đơn giá 350.000đ/bộ"
  },
  {
    id: 9,
    stt: "9",
    vatLieu: "Ổ khóa cửa thông chính, cửa ban công, khóa núm",
    goiCoBan: "Đơn giá 380.000đ/bộ",
    goiKhac: "Đơn giá 520.000đ/bộ",
    goiTot: "Đơn giá 1.150.000đ/bộ"
  },
  {
    id: 10,
    stt: "10",
    vatLieu: "Trần thạch cao",
    goiCoBan: "Khung xương Hà Nội, tấm thường",
    goiKhac: "Khung Xương Vĩnh Tường tấm Thái Lan",
    goiTot: "Khung Xương Vĩnh Tường tấm Thái Lan"
  }
]
