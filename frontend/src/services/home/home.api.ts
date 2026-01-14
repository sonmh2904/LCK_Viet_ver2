export type HighlightPost = {
  _id: string
  title: string
  shortDescription?: string
  thumbnail: string
  createdAt: string
  category: string
  tag: string
}

const highlightPosts: HighlightPost[] = [
  {
    _id: "giai-phap-thiet-ke-mai-nhat",
    title: "Giải pháp thiết kế mái Nhật tối ưu chi phí",
    shortDescription:
      "HT-Home đề xuất cấu trúc mái Nhật cân bằng giữa thẩm mỹ, công năng và ngân sách dành cho gia chủ Việt.",
    thumbnail:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-02T00:00:00.000Z",
    category: "Thiết kế kiến trúc",
    tag: "Mái Nhật",
  },
  {
    _id: "noi-that-chung-cu-chuan-gu",
    title: "Nội thất chung cư chuẩn gu thế hệ trẻ",
    shortDescription:
      "Giải pháp thi công trọn gói giúp căn hộ tối ưu ánh sáng, công năng và chất liệu hiện đại.",
    thumbnail:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-12-12T00:00:00.000Z",
    category: "Thiết kế nội thất",
    tag: "Chung cư",
  },
  {
    _id: "thi-cong-biet-thu-vuon",
    title: "Biệt thự vườn sang trọng chuẩn nghỉ dưỡng",
    shortDescription:
      "Phối hợp cảnh quan và khối kiến trúc để tạo nên không gian nghỉ dưỡng riêng tư, gần gũi thiên nhiên.",
    thumbnail:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-11-08T00:00:00.000Z",
    category: "Thi công",
    tag: "Biệt thự",
  },
  {
    _id: "video-du-an",
    title: "Video dự án tiêu biểu 2025",
    shortDescription:
      "Theo dõi hành trình HT-Home triển khai thực tế từ phác thảo đến bàn giao công trình hoàn thiện.",
    thumbnail:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2025-10-20T00:00:00.000Z",
    category: "Dự án",
    tag: "Video",
  },
]

export const homeApi = {
  async getHighlightPosts(): Promise<HighlightPost[]> {
    return highlightPosts
  },
}
