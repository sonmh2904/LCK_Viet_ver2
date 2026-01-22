"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/admin-layout";
import { designAPI, Design, UpdateDesignData } from "@/services/design/design.api";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload } from "lucide-react";

export default function EditDesign() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [design, setDesign] = useState<Design | null>(null);
  const [formData, setFormData] = useState<UpdateDesignData>({
    projectName: "",
    mainImage: "",
    subImages: [],
    investor: "",
    implementationYear: new Date().getFullYear(),
    projectType: "",
    address: "",
    investmentLevel: "",
    landArea: 0,
    constructionArea: 0,
    floors: 1,
    functionality: "",
    designUnit: "",
    detailedDescription: "",
    categories: ""
  });

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchDesign();
      fetchCategories();
    }
  }, [id]);

  const fetchDesign = async () => {
    try {
      setFetchLoading(true);
      console.log('Fetching design with ID:', id);
      
      if (!id) {
        toast.error("ID thiết kế không hợp lệ");
        router.push("/admin/designs");
        return;
      }
      
      const response = await designAPI.getDesignById(id as string);
      const designData = response.data;
      console.log('Design data received:', designData);
      
      setDesign(designData);
      
      setFormData({
        projectName: designData.projectName,
        mainImage: designData.mainImage,
        subImages: designData.subImages || [],
        investor: designData.investor,
        implementationYear: designData.implementationYear,
        projectType: designData.projectType,
        address: designData.address,
        investmentLevel: designData.investmentLevel || "",
        landArea: designData.landArea,
        constructionArea: designData.constructionArea,
        floors: designData.floors,
        functionality: designData.functionality,
        designUnit: designData.designUnit,
        detailedDescription: designData.detailedDescription || "",
        categories: designData.categories?._id || ''
      });
    } catch (error: any) {
      console.error('Error fetching design:', error);
      
      if (error.message?.includes('404') || error.message?.includes('Not Found')) {
        toast.error("Không tìm thấy thiết kế");
      } else if (error.message?.includes('400') || error.message?.includes('Invalid')) {
        toast.error("ID thiết kế không hợp lệ");
      } else {
        toast.error("Không thể tải thông tin thiết kế");
      }
      
      router.push("/admin/designs");
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Fetch real categories from API
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
      console.log('Fetched categories:', data);
      
      // Filter only active categories
      const activeCategories = data.data?.categories?.filter((cat: any) => cat.isActive) || [];
      setCategories(activeCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      // Fallback to mock data if API fails
      const mockCategories = [
        { _id: "69719a7ebb0805c6abe89441", name: "Thiết kế nội thất" },
        { _id: "69719a7ebb0805c6abe89442", name: "Thiết kế ngoại thất" }
      ];
      setCategories(mockCategories);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean = true) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if adding sub image would exceed limit
    if (!isMain && formData.subImages && formData.subImages.length >= 10) {
      toast.error("Tối đa 10 hình ảnh phụ được phép");
      return;
    }

    // For now, just convert to base64. In production, you'd upload to Cloudinary
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      if (isMain) {
        setFormData(prev => ({ ...prev, mainImage: base64String }));
      } else {
        setFormData(prev => ({
          ...prev,
          subImages: [...(prev.subImages || []), base64String]
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeSubImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subImages: prev.subImages?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!id || typeof id !== 'string') return;

    // Validation
    const requiredFields = [
      'projectName', 'mainImage', 'investor', 'implementationYear',
      'projectType', 'address', 'landArea', 'constructionArea',
      'floors', 'functionality', 'designUnit', 'categories'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof UpdateDesignData]) {
        toast.error(`Vui lòng điền đầy đủ thông tin ${field}`);
        return;
      }
    }

    try {
      setLoading(true);
      await designAPI.updateDesign(id, formData);
      toast.success("Cập nhật thiết kế thành công!");
      router.push("/admin/designs");
    } catch (error) {
      toast.error("Không thể cập nhật thiết kế");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout title="Chỉnh sửa thiết kế" description="Đang tải...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin thiết kế...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!design) {
    return (
      <AdminLayout title="Lỗi" description="Không tìm thấy thiết kế">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Không tìm thấy thiết kế</p>
          <button
            onClick={() => router.push("/admin/designs")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Quay lại danh sách
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Chỉnh sửa thiết kế" description={`Cập nhật thông tin dự án ${design.projectName}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa thiết kế</h1>
          <p className="text-gray-600 mt-2">Cập nhật thông tin dự án: {design.projectName}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Thông tin cơ bản</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên dự án <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đầu tư <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="investor"
                  value={formData.investor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại hình dự án <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Biệt thự, Nhà phố, Căn hộ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đơn vị thiết kế <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designUnit"
                  value={formData.designUnit}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  name="categories"
                  value={formData.categories}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Thông số kỹ thuật</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Năm thực hiện <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="implementationYear"
                  value={formData.implementationYear}
                  onChange={handleInputChange}
                  min="2000"
                  max={new Date().getFullYear() + 5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diện tích đất (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="landArea"
                  value={formData.landArea}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diện tích xây dựng (m²) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="constructionArea"
                  value={formData.constructionArea}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tầng <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="floors"
                  value={formData.floors}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức đầu tư
                </label>
                <input
                  type="text"
                  name="investmentLevel"
                  value={formData.investmentLevel}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Từ 5 tỷ, 2-3 tỷ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Mô tả</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Công năng sử dụng <span className="text-red-500">*</span>
              </label>
              <textarea
                name="functionality"
                value={formData.functionality}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả công năng sử dụng của dự án..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả chi tiết
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mô tả chi tiết về dự án..."
              />
            </div>
          </div>

          {/* Images */}
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 pb-2 border-b">Hình ảnh</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh chính <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                  id="mainImage"
                />
                <label
                  htmlFor="mainImage"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Thay đổi hình ảnh
                </label>
                {formData.mainImage && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={formData.mainImage}
                      alt="Main image"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span className="text-sm text-green-600">Đã tải lên</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh phụ ({formData.subImages?.length || 0}/10)
              </label>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="hidden"
                  id="subImages"
                  disabled={(formData.subImages?.length || 0) >= 10}
                />
                <label
                  htmlFor="subImages"
                  className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors w-fit ${
                    (formData.subImages?.length || 0) >= 10
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Thêm hình ảnh phụ
                </label>
                
                {(formData.subImages && formData.subImages.length > 0) && (
                  <div className="grid grid-cols-4 gap-4">
                    {formData.subImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Sub image ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeSubImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {(formData.subImages?.length || 0) >= 10 && (
                  <p className="text-sm text-gray-500">Đã đạt số lượng hình ảnh phụ tối đa</p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Đang lưu..." : "Cập nhật thiết kế"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
