"use client"

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-24 pt-28">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f2f2f2] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-6 text-center lg:flex-row lg:items-start lg:gap-16 lg:text-left">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-[#b30000]/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000]">
            Giới thiệu
          </span>
          <h1 className="mt-6 text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow">
            LCK Việt – Kiến tạo tương lai
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#4b3a36] sm:text-lg">
            Bạn đang ấp ủ <strong className="text-[#b30000] font-bold">khát vọng</strong> về một không gian sống không chỉ <strong className="text-[#b30000] font-bold">đẹp</strong> và <strong className="text-[#b30000] font-bold">sang trọng</strong>, mà còn mang đậm <strong className="text-[#b30000] font-bold">dấu ấn cá nhân</strong>? Bạn đang tìm kiếm một đơn vị <strong className="text-[#b30000] font-bold">kiến trúc</strong> – <strong className="text-[#b30000] font-bold">nội thất</strong> đủ <strong className="text-[#b30000] font-bold">tâm huyết</strong>, <strong className="text-[#b30000] font-bold">năng lực</strong> và <strong className="text-[#b30000] font-bold">bản lĩnh</strong> để biến những ý tưởng đó thành <strong className="text-[#b30000] font-bold">hiện thực</strong>?
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#4b3a36] sm:text-lg">
            <strong className="text-[#b30000] font-bold">CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ NỘI THẤT LCK VIỆT</strong> tự hào là người đồng hành đáng tin cậy trên hành trình kiến tạo không gian sống lý tưởng. Chúng tôi quy tụ đội ngũ kiến trúc sư trẻ trung, sáng tạo nhưng dày dạn kinh nghiệm thực tiễn – những con người luôn "<strong className="text-[#b30000] font-bold">thiện chiến</strong>" trong từng dự án, sẵn sàng chinh phục mọi thách thức để mang đến các công trình mang giá trị bền vững và thẩm mỹ vượt thời gian.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#4b3a36] sm:text-lg">
            Với tư duy thiết kế hiện đại, sự am hiểu sâu sắc về công năng và tinh thần làm nghề tận tâm, <strong className="text-[#b30000] font-bold">LCK Việt</strong> không chỉ tạo ra những công trình đẹp mắt, mà còn kiến tạo nên những không gian sống truyền cảm hứng, phản ánh trọn vẹn cá tính và phong cách của mỗi khách hàng.
          </p>
        </div>

        <div className="relative flex w-full max-w-[800px] flex-1 justify-center">
          <div className="relative aspect-[9/14] w-full max-w-[400px] overflow-hidden rounded-[32px] border-[6px] border-white shadow-2xl shadow-[#b30000]/20">
            <video
              src="/demo_gioithieu.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
