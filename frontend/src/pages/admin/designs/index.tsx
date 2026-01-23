"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Building,
  MapPin,
  User,
  Star
} from "lucide-react";
import { designAPI, Design } from "@/services/design/design.api";
import { toast } from "sonner";

export default function DesignManagement() {
  const router = useRouter();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showHighlightOnly, setShowHighlightOnly] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; design: Design | null }>({ open: false, design: null });

  useEffect(() => {
    fetchDesigns();
    fetchCategories();
  }, [currentPage, searchQuery, showHighlightOnly]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9999/api/v1'}/categories`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      const activeCategories = data.data?.categories?.filter((cat: any) => cat.isActive) || [];
      setCategories(activeCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      if (selectedCategory) {
        params.categories = selectedCategory;
      }

      if (showHighlightOnly) {
        // Use highlight designs endpoint when highlight filter is active
        const response = await designAPI.getHighlightDesigns({ page: currentPage, limit: 10 });
        setDesigns(response.data.designs);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
        return;
      }

      const response = await designAPI.getDesigns(params);
      setDesigns(response.data.designs);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
    } catch (error) {
      toast.error("Không thể tải danh sách thiết kế");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDesign = () => {
    router.push("/admin/designs/create");
  };

  const handleEditDesign = (design: Design) => {
    router.push(`/admin/designs/edit/${design._id}`);
  };

  const handleDeleteDesign = (design: Design) => {
    setDeleteModal({ open: true, design });
  };

  const confirmDelete = async () => {
    if (!deleteModal.design) return;
    
    try {
      await designAPI.deleteDesign(deleteModal.design!._id);
      setDesigns(designs.filter(d => d._id !== deleteModal.design!._id));
      setTotalItems(totalItems - 1);
      toast.success("Xóa thiết kế thành công");
      setDeleteModal({ open: false, design: null });
    } catch (error) {
      toast.error("Không thể xóa thiết kế");
      console.error(error);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, design: null });
  };

  const handleToggleHighlight = async (design: Design) => {
    try {
      await designAPI.updateDesign(design._id, { isHighlight: !design.isHighlight });
      setDesigns(designs.map(d => 
        d._id === design._id ? { ...d, isHighlight: !d.isHighlight } : d
      ));
      toast.success(design.isHighlight ? "Đã bỏ đánh dấu nổi bật" : "Đã đánh dấu nổi bật");
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái nổi bật");
      console.error(error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDesigns();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredDesigns = designs.filter(design => 
    design.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.investor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.projectType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && designs.length === 0) {
    return (
      <AdminLayout title="Quản lý thiết kế" description="Đang tải...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải danh sách thiết kế...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header with Add Design Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý thiết kế</h1>
          <span className="text-sm text-gray-500">{totalItems} thiết kế</span>
        </div>
        <button
          onClick={handleCreateDesign}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tạo thiết kế mới
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">+12%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">{totalItems}</div>
            <div className="text-sm text-gray-600">Tổng thiết kế</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {new Set(designs.map(d => d.investor)).size}
            </div>
            <div className="text-sm text-gray-600">Chủ đầu tư</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">+15%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {new Set(designs.map(d => d.address)).size}
            </div>
            <div className="text-sm text-gray-600">Địa điểm</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+{designs.filter(design => design.isHighlight).length}</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">
              {designs.filter(design => design.isHighlight).length}
            </div>
            <div className="text-sm text-gray-600">Thiết kế nổi bật</div>
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
                placeholder="Tìm kiếm thiết kế..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Design Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên dự án
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chủ đầu tư
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Năm thực hiện
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nổi bật
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDesigns.map((design, index) => (
                <tr key={design._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {(currentPage - 1) * 10 + index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {design.projectName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {design.categories?.name || 'Không có danh mục'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{design.investor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{design.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{design.implementationYear}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleHighlight(design)}
                      className={`p-1 rounded-full transition-colors ${
                        design.isHighlight 
                          ? "text-yellow-500 hover:text-yellow-600" 
                          : "text-gray-300 hover:text-yellow-500"
                      }`}
                      title={design.isHighlight ? "Bỏ nổi bật" : "Đặt nổi bật"}
                    >
                      <Star className="w-4 h-4" fill={design.isHighlight ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {design.mainImage && (
                        <img 
                          src={design.mainImage} 
                          alt={design.projectName}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/designs/${design._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleEditDesign(design)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDesign(design)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDesigns.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có thiết kế nào</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery 
                ? "Không tìm thấy thiết kế nào phù hợp với tìm kiếm của bạn." 
                : "Chưa có thiết kế nào. Hãy tạo thiết kế mới!"
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateDesign}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tạo thiết kế mới
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Hiển thị {filteredDesigns.length} của {totalItems} thiết kế
            </div>
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
          </div>
        )}
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
                <h3 className="text-lg font-semibold text-gray-900">Xóa thiết kế</h3>
                <p className="text-sm text-gray-600">Bạn có chắc muốn xóa thiết kế này?</p>
              </div>
            </div>
            
            {deleteModal.design && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{deleteModal.design.projectName}</p>
                <p className="text-sm text-gray-600">{deleteModal.design.projectType}</p>
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
