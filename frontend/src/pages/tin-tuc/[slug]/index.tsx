import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AboutMapSection } from "@/components/ui/home/about-map-section"
import { FooterCTASection } from "@/components/ui/home/footer-cta-section"
import { Clock, Eye, TrendingUp } from "lucide-react";
import { getBlogBySlug, getTopViewedBlogs } from "@/services/blog/blog.api";
import type { Blog } from "@/services/blog/blog.api";

export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch blog detail and featured blogs in parallel
        const [blogData, featuredData] = await Promise.all([
          getBlogBySlug(slug as string),
          getTopViewedBlogs(5)
        ]);
        
        console.log('Blog data:', blogData);
        console.log('Featured blogs:', featuredData);
        
        setBlog(blogData);
        // Filter out current blog from featured list
        setFeaturedBlogs(featuredData.filter(b => b._id !== blogData._id).slice(0, 5));
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const renderContent = (content: {
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    fontSize?: string;
    imageUrl?: string;
    url?: string;
  }[]) => {
    if (!content || !Array.isArray(content)) {
      return <p>Không có nội dung.</p>;
    }

    return content.map((item, index) => {
      if (!item || !item.type) return null;

      switch (item.type) {
        case 'paragraph':
          return (
            <p 
              key={index} 
              className={`mb-4 text-gray-700 leading-relaxed ${
                item.bold ? 'font-bold' : ''
              } ${item.italic ? 'italic' : ''} ${
                item.fontSize === 'small' ? 'text-sm' : 
                item.fontSize === 'large' ? 'text-lg' : 
                'text-base'
              }`}
            >
              {item.text || ''}
            </p>
          );
        
        case 'header':
          return (
            <h2 
              key={index} 
              className={`mb-4 text-gray-800 ${
                item.fontSize === 'small' ? 'text-xl' : 
                item.fontSize === 'large' ? 'text-3xl' : 
                'text-2xl'
              } font-bold`}
            >
              {item.text || ''}
            </h2>
          );
        
        case 'bullet':
          return (
            <li 
              key={index} 
              className={`mb-2 text-gray-700 list-disc ${
                item.bold ? 'font-bold' : ''
              } ${item.italic ? 'italic' : ''} ${
                item.fontSize === 'small' ? 'text-sm' : 
                item.fontSize === 'large' ? 'text-lg' : 
                'text-base'
              }`}
            >
              {item.text || ''}
            </li>
          );
        
        case 'image':
          return (
            <div key={index} className="mb-6">
              <Image
                src={item.url || ''}
                alt={item.text || 'Blog image'}
                width={800}
                height={400}
                className="rounded-lg shadow-md w-full object-cover"
              />
              {item.text && (
                <p className="text-center text-sm text-gray-600 mt-2 italic">
                  {item.text}
                </p>
              )}
            </div>
          );
        
        default:
          return (
            <div key={index} className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                Unknown content type: {item.type}
              </p>
            </div>
          );
      }
    }).filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">Không tìm thấy bài viết.</p>
          <button 
            onClick={() => router.push('/tin-tuc')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Quay lại trang tin tức
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{blog.title} - LCK Việt Nam</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://lckviet.com/tin-tuc/${blog.slug}`} />
      </Head>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Blog Detail - 8 parts (80%) */}
            <div className="flex-1 lg:w-4/5">
              <article className="overflow-hidden">
                {/* Featured Image */}
                {blog.image && (
                  <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}

                <div className="px-0">
                  {/* Article Header */}
                  <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {blog.title}
                    </h1>
                    
                    <div className="flex items-center text-sm text-gray-500 space-x-4 flex-wrap">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      {blog.views !== undefined && (
                        <div className="flex items-center">
                          <Eye size={16} className="mr-1" />
                          <span>{blog.views} lượt xem</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : blog.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {blog.status === 'active' ? 'Đã xuất bản' : 
                           blog.status === 'draft' ? 'Bản nháp' : 'Không hoạt động'}
                        </span>
                      </div>
                    </div>
                  </header>

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    {renderContent(blog.content as {
                      type: string;
                      text?: string;
                      bold?: boolean;
                      italic?: boolean;
                      fontSize?: string;
                      imageUrl?: string;
                      url?: string;
                    }[])}
                  </div>
                </div>
              </article>
            </div>

            {/* Featured Blogs Sidebar - 2 parts (20%) */}
            <div className="lg:w-1/5">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">Bài viết nổi bật</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {featuredBlogs.length > 0 ? (
                      featuredBlogs.map((featuredBlog) => (
                        <Link
                          key={featuredBlog._id}
                          href={`/tin-tuc/${featuredBlog.slug}`}
                          className="block group"
                        >
                          <div className="flex flex-col sm:flex-row gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            {featuredBlog.image && (
                              <div className="relative w-full sm:w-20 h-20 sm:h-20 flex-shrink-0">
                                <Image
                                  src={featuredBlog.image}
                                  alt={featuredBlog.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                                {featuredBlog.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Clock size={12} className="mr-1" />
                                <span>{formatDate(featuredBlog.createdAt)}</span>
                              </div>
                              {featuredBlog.views !== undefined && (
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Eye size={12} className="mr-1" />
                                  <span>{featuredBlog.views} lượt xem</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Không có bài viết nổi bật nào
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AboutMapSection />
      <FooterCTASection />
    </div>
  );
}
