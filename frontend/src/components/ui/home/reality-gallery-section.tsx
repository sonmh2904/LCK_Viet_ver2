"use client"

const realityGallery = [
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    caption: "Phòng khách biệt thự hiện đại",
  },
  {
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80",
    caption: "Không gian ngoại thất sang trọng",
  },
  {
    src: "https://xaydungchanphuong.com/wp-content/uploads/2021/07/nha-pho-thuong-mai-hien-dai.jpeg",
    caption: "Nhà phố kết hợp kinh doanh",
  },
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    caption: "Phòng ngủ master tone nâu ấm",
  },
]

export function RealityGallerySection() {
  return (
    <section className="relative bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#ffe4dc,transparent_60%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">Dự án thực hiện</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600">
            Bộ sưu tập ảnh thi công thực tế giúp bạn cảm nhận rõ nét sự chỉn chu, tinh tế trong từng chi tiết mà LCK Việt mang lại.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {realityGallery.map((item) => (
            <figure key={item.src} className="group overflow-hidden rounded-3xl border border-[#ffd1c4] bg-white shadow-lg">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#cf1f1f]/70 via-transparent to-transparent" />
              </div>
              <figcaption className="p-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#b30000]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
