import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight, Clock, Eye } from "lucide-react";
import { AboutMapSection } from "@/components/ui/home/about-map-section";
import { FooterCTASection } from "@/components/ui/home/footer-cta-section";
import { getAllBlogs, getTopViewedBlogs } from "@/services/blog/blog.api";
import type { Blog } from "@/services/blog/blog.api";

function NewsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [popularPosts, setPopularPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<NodeJS.Timeout | null>(null);
  const postsPerPage = 6;
  const featuredPosts = blogs.slice(0, 3);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [blogsData, popularData] = await Promise.all([
          getAllBlogs(),
          getTopViewedBlogs(5)
        ]);

        setBlogs(blogsData);
        setPopularPosts(popularData);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.title = "Tin tức - LCK Việt Nam";
  }, []);

  // Filter posts by search
  const filteredPosts = blogs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Auto slide for featured posts
  useEffect(() => {
    sliderRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (sliderRef.current) {
        clearInterval(sliderRef.current);
      }
    };
  }, [featuredPosts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
    resetSlider();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1));
    resetSlider();
  };

  const resetSlider = () => {
    if (sliderRef.current) {
      clearInterval(sliderRef.current);
    }
    sliderRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Tin tức - LCK Việt Nam</title>
        <meta name="description" content="Cập nhật những tin tức mới nhất về LCK Việt Nam, các giải đấu, sự kiện và hoạt động nổi bật trong cộng đồng Liên Minh Huyền Thoại Việt Nam." />
      </Head>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Tìm kiếm</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Bài viết nổi bật</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link 
                    href={`/tin-tuc/${post.slug}`} 
                    key={post._id}
                    className="flex gap-3 group"
                  >
                    <div className="w-20 h-16 relative flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Featured Posts Slider */}
            {currentPage === 1 && featuredPosts.length > 0 && (
              <div className="mb-12 relative overflow-hidden rounded-xl shadow-lg">
                <div className="relative h-96 w-full">
                  {featuredPosts.map((post, index) => (
                    <div
                      key={post._id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <Link href={`/tin-tuc/${post.slug}`}>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-red-400 transition-colors">
                              {post.title}
                            </h2>
                          </Link>
                          <div className="flex items-center text-sm text-gray-300">
                            <Clock size={16} className="mr-1" />
                            <span className="mr-4">{formatDate(post.createdAt)}</span>
                            <Eye size={16} className="mr-1" />
                            <span>{post.views || 0} lượt xem</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {featuredPosts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentSlide(index);
                        resetSlider();
                      }}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Posts Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Tin tức mới nhất</h2>
              {currentPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {currentPosts.map((post) => (
                    <article key={post._id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Link href={`/tin-tuc/${post.slug}`}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Clock size={14} className="mr-1" />
                          <span>{formatDate(post.createdAt)}</span>
                          <span className="mx-2">•</span>
                          <Eye size={14} className="mr-1" />
                          <span>{post.views || 0} lượt xem</span>
                        </div>
                        <Link href={`/tin-tuc/${post.slug}`}>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-red-600 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt || 'Chưa có mô tả'}</p>
                        <Link
                          href={`/tin-tuc/${post.slug}`}
                          className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
                        >
                          Đọc thêm
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow">
                  <p className="text-gray-500">Không tìm thấy bài viết nào phù hợp.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-red-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Additional Sections */}
      <AboutMapSection />
      <FooterCTASection />
    </div>
  );
}

export default function NewsPage() {
  return (
      <NewsPageContent />
  );
}