"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  MessageSquare,
  Star
} from "lucide-react";
import { getAllBlogs, deleteBlog, updateBlog, Blog } from "@/services/blog/blog.api";
import { toast } from "sonner";

export default function BlogManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      toast.error("Không thể tải danh sách bài viết");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = () => {
    router.push("/admin/blogs/create");
  };

  const handleEditBlog = (blog: Blog) => {
    router.push(`/admin/blogs/edit/${blog.slug}`);
  };

  const handleDeleteBlog = async (blog: Blog) => {
    if (confirm(`Bạn có chắc muốn xóa bài viết "${blog.title}"?`)) {
      try {
        await deleteBlog(blog.slug);
        setBlogs(blogs.filter(b => b.slug !== blog.slug));
        toast.success("Xóa bài viết thành công");
      } catch (error) {
        toast.error("Không thể xóa bài viết");
        console.error(error);
      }
    }
  };

  const handleSearch = () => {
    fetchBlogs();
  };

  const handleToggleHighlight = async (blog: Blog) => {
    try {
      await updateBlog(blog.slug, {
        title: blog.title,
        content: blog.content,
        image: blog.image,
        status: blog.status,
        isHighlight: !blog.isHighlight
      });
      
      // Update blog in local state
      setBlogs(blogs.map(b => 
        b._id === blog._id ? { ...b, isHighlight: !b.isHighlight } : b
      ));
      
      toast.success(blog.isHighlight ? "Bỏ nổi bật thành công" : "Đặt nổi bật thành công");
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái nổi bật");
      console.error(error);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout title="Quản lý bài viết" description="Đang tải...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải danh sách bài viết...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout >
      {/* Header with Add Blog Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
          <span className="text-sm text-gray-500">{blogs.length} bài viết</span>
        </div>
        <button
          onClick={handleCreateBlog}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo bài viết mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Edit className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">+12%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">{blogs.length}</div>
            <div className="text-sm text-gray-600">Tổng bài viết</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+{blogs.filter(blog => blog.isHighlight).length}</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {blogs.filter(blog => blog.isHighlight).length}
            </div>
            <div className="text-sm text-gray-600">Bài viết nổi bật</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+24%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {blogs.filter(blog => blog.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Đã xuất bản</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">0%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {blogs.filter(blog => blog.status === "draft").length}
            </div>
            <div className="text-sm text-gray-600">Bản nháp</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nổi bật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {filteredBlogs.indexOf(blog) + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {blog.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        /{blog.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap ${
                      blog.status === "active" 
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : blog.status === "draft"
                        ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}>
                      <span className={`w-2 h-2 rounded-full mr-1.5 ${
                        blog.status === "active" 
                          ? "bg-green-500"
                          : blog.status === "draft"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}></span>
                      {blog.status === "active" ? "Đã xuất bản" : blog.status === "draft" ? "Nháp" : blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {blog.image && (
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-8 h-8 object-cover rounded"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleHighlight(blog)}
                      className={`p-1 rounded-full transition-colors ${
                        blog.isHighlight 
                          ? "text-yellow-500 hover:text-yellow-600" 
                          : "text-gray-300 hover:text-yellow-500"
                      }`}
                      title={blog.isHighlight ? "Bỏ nổi bật" : "Đặt nổi bật"}
                    >
                      <Star className="w-4 h-4" fill={blog.isHighlight ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Xem bài viết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="p-1 text-gray-400 hover:text-green-600"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có bài viết nào</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? "Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn." 
                : "Chưa có bài viết nào. Hãy tạo bài viết mới!"
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateBlog}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo bài viết mới
              </button>
            )}
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Hiển thị {filteredBlogs.length} của {blogs.length} bài viết
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
