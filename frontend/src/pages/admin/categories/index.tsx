import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../../components/layout/admin-layout';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest
} from '../../../services/category/categories.api';

const CategoriesManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CreateCategoryRequest>({ name: '' });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; category: Category | null }>({ open: false, category: null });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        isActive: showInactive ? undefined : true
      };
      
      const response = await getCategories(params);
      
      if (response.code === 200) {
        setCategories(response.data.categories);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } else {
        toast.error(response.message || 'Lỗi khi tải danh sách danh mục');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Lỗi khi tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, showInactive]);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Create category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Tên danh mục không được để trống');
      return;
    }

    try {
      const response = await createCategory(formData);
      
      if (response.code === 201) {
        toast.success('Tạo danh mục thành công');
        setShowCreateModal(false);
        setFormData({ name: '' });
        fetchCategories();
      } else {
        toast.error(response.message || 'Lỗi khi tạo danh mục');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Lỗi khi tạo danh mục');
    }
  };

  // Update category
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !formData.name.trim()) {
      toast.error('Tên danh mục không được để trống');
      return;
    }

    try {
      const updateData: UpdateCategoryRequest = {
        name: formData.name,
        isActive: selectedCategory.isActive
      };
      
      const response = await updateCategory(selectedCategory._id, updateData);
      
      if (response.code === 200) {
        toast.success('Cập nhật danh mục thành công');
        setShowEditModal(false);
        setSelectedCategory(null);
        setFormData({ name: '' });
        fetchCategories();
      } else {
        toast.error(response.message || 'Lỗi khi cập nhật danh mục');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Lỗi khi cập nhật danh mục');
    }
  };

  // Delete category
  const handleDeleteCategory = (category: Category) => {
    setDeleteModal({ open: true, category });
  };

  const confirmDelete = async () => {
    if (!deleteModal.category) return;
    
    try {
      const response = await deleteCategory(deleteModal.category!._id);
      
      if (response.code === 200) {
        toast.success('Xóa danh mục thành công');
        fetchCategories();
        setDeleteModal({ open: false, category: null });
      } else {
        toast.error(response.message || 'Lỗi khi xóa danh mục');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Lỗi khi xóa danh mục');
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, category: null });
  };

  // Toggle category status
  const handleToggleStatus = async (category: Category) => {
    try {
      const response = await updateCategory(category._id, {
        isActive: !category.isActive
      });
      
      if (response.code === 200) {
        toast.success(`Đã ${category.isActive ? 'vô hiệu hóa' : 'kích hoạt'} danh mục`);
        fetchCategories();
      } else {
        toast.error(response.message || 'Lỗi khi cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('Lỗi khi cập nhật trạng thái');
    }
  };

  // Open edit modal
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({ name: category.name });
    setShowEditModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600 mt-2">Quản lý tất cả danh mục sản phẩm</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng danh mục</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">
                  {categories.filter(c => c.isActive).length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã vô hiệu hóa</p>
                <p className="text-2xl font-bold text-red-600">
                  {categories.filter(c => !c.isActive).length}
                </p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <EyeOff className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
              </div>
              
              <button
                onClick={() => setShowInactive(!showInactive)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  showInactive 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter className="h-4 w-4" />
                {showInactive ? 'Tất cả' : 'Đang hoạt động'}
              </button>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Thêm danh mục
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
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
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                      </div>
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      {searchTerm ? 'Không tìm thấy danh mục nào' : 'Chưa có danh mục nào'}
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {category.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.isActive ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(category)}
                            className={`p-2 rounded-lg transition-colors ${
                              category.isActive
                                ? 'text-red-600 hover:bg-red-50'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={category.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                          >
                            {category.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteCategory(category)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Trước
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> đến{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * 10, totalItems)}
                    </span>{' '}
                    trong <span className="font-medium">{totalItems}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Trước
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === i + 1
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Thêm danh mục mới</h2>
              <form onSubmit={handleCreateCategory}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên danh mục"
                    required
                  />
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setFormData({ name: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Thêm danh mục
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h2>
              <form onSubmit={handleUpdateCategory}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên danh mục
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập tên danh mục"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategory.isActive}
                      onChange={(e) => setSelectedCategory({
                        ...selectedCategory,
                        isActive: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Đang hoạt động</span>
                  </label>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedCategory(null);
                      setFormData({ name: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Cập nhật
                  </button>
                </div>
              </form>
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
                <h3 className="text-lg font-semibold text-gray-900">Xóa danh mục</h3>
                <p className="text-sm text-gray-600">Bạn có chắc muốn xóa danh mục này?</p>
              </div>
            </div>
            
            {deleteModal.category && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{deleteModal.category.name}</p>
                <p className="text-sm text-gray-600">{deleteModal.category.slug}</p>
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
};

export default CategoriesManagement;
