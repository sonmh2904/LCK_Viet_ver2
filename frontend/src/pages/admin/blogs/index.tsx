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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; blog: Blog | null }>({ open: false, blog: null });

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchQuery]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchQuery
      };
      const response = await getAllBlogs(params) as any;
      
      // Handle different response formats
      if (Array.isArray(response)) {
        // Direct array response
        setBlogs(response);
        setTotalPages(1);
        setTotalItems(response.length);
      } else if (response && response.data) {
        // Object with data property
        setBlogs(response.data.blogs || response.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalItems(response.data.pagination?.totalItems || response.data.length || 0);
      } else {
        setBlogs([]);
        setTotalPages(1);
        setTotalItems(0);
      }
    } catch (error) {
      toast.error("Không thể tải danh sách bài viết");
      console.error(error);
      setBlogs([]);
      setTotalPages(1);
      setTotalItems(0);
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

  const handleDeleteBlog = (blog: Blog) => {
    setDeleteModal({ open: true, blog });
  };

  const confirmDelete = async () => {
    if (!deleteModal.blog) return;
    
    try {
      await deleteBlog(deleteModal.blog!.slug);
      setBlogs(blogs.filter(b => b.slug !== deleteModal.blog!.slug));
      toast.success("Xóa bài viết thành công");
      setDeleteModal({ open: false, blog: null });
    } catch (error) {
      toast.error("Không thể xóa bài viết");
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, blog: null });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBlogs();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              {blogs.map((blog, index) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {index + 1}
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

        {blogs.length === 0 && (
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
            Hiển thị {blogs.length} của {totalItems} bài viết
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Sau
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Xóa bài viết</h3>
                <p className="text-sm text-gray-600">Bạn có chắc muốn xóa bài viết này?</p>
              </div>
            </div>
            
            {deleteModal.blog && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 line-clamp-2">{deleteModal.blog.title}</p>
                <p className="text-sm text-gray-600">{deleteModal.blog.slug}</p>
              </div>
            )}
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
