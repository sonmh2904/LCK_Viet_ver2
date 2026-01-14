"use client"

import React from "react"

export function AboutContactSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="mb-16 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="/banner/banner-3.png" 
            alt="LCK VIỆT NAM" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Why Choose Us Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex flex-col items-center mb-12">
            <span className="inline-flex items-center rounded-full bg-[#b30000]/10 px-5 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#b30000] mb-4">
              Về chúng tôi
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-wider text-[#b30000] sm:text-5xl font-sans italic drop-shadow text-center">
              Vì sao LCK Việt là lựa chọn hoàn hảo cho bạn?
            </h2>
          </div>
          
          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
            <p className="mb-8">
              Chúng tôi tự hào là một trong những đơn vị tiên phong trong lĩnh vực kiến trúc và nội thất, đặc biệt nổi bật với <strong className="text-red-700">đội ngũ kiến trúc sư trẻ, sáng tạo và "thiện chiến"</strong> - đây chính là linh hồn của LCK Việt. Không chỉ sở hữu trình độ chuyên môn vững vàng và tư duy thiết kế độc đáo, đội ngũ KTS của chúng tôi còn mang trong mình ngọn lửa nhiệt huyết, luôn sẵn sàng đối mặt với mọi thách thức để kiến tạo nên những công trình xuất sắc nhất. Sự trẻ trung giúp chúng tôi không ngừng cập nhật xu hướng, dám nghĩ, dám làm và tạo ra những giá trị khác biệt, vượt xa mong đợi của khách hàng.
            </p>
            
            <p className="mb-8">
              Với <strong className="text-red-700">tư duy thiết kế đột phá, cá nhân hóa</strong>, chúng tôi hiểu rằng mỗi khách hàng là một cá thể độc đáo, và mỗi không gian cần phải phản ánh rõ cá tính ấy. Tại LCK Việt, chúng tôi không ngừng khám phá, lắng nghe và biến những ý tưởng dù là nhỏ nhất của bạn thành hiện thực, tạo nên những không gian sống độc bản, mang đậm dấu ấn cá nhân và tối ưu công năng sử dụng.
            </p>
            
            <p className="mb-8">
              <strong className="text-red-700">Chất lượng đặt lên hàng đầu</strong> - dù là một công ty trẻ, nhưng chất lượng luôn là kim chỉ nam trong mọi hoạt động của chúng tôi. Từ khâu tư vấn, lên ý tưởng, thiết kế chi tiết đến giám sát thi công và hoàn thiện, mọi quy trình đều được thực hiện một cách tỉ mỉ, chuyên nghiệp, đảm bảo tính thẩm mỹ, độ bền vững và sự an toàn cho mọi công trình.
            </p>
            
            <p className="mb-8">
              Đến với LCK Việt, bạn sẽ được trải nghiệm <strong className="text-red-700">dịch vụ tận tâm, chuyên nghiệp</strong> khi chúng tôi cam kết đồng hành cùng bạn từ những bước đầu tiên đến khi công trình hoàn tất. Chúng tôi luôn sẵn sàng lắng nghe, tư vấn tận tình và giải đáp mọi thắc mắc, giúp bạn an tâm tuyệt đối trong suốt quá trình hợp tác.
            </p>
            
            <p>
              Cuối cùng, với <strong className="text-red-700">giải pháp tối ưu chi phí hiệu quả</strong>, chúng tôi cam kết mang lại những phương án thiết kế và thi công tối ưu nhất về chi phí mà vẫn đảm bảo chất lượng và tính thẩm mỹ vượt trội, nhờ vào sự linh hoạt và khả năng tìm kiếm giải pháp tối ưu của đội ngũ trẻ đầy nhiệt huyết.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
