"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Plus,
  X
} from "lucide-react";
import { getBlogBySlug, updateBlog } from "@/services/blog/blog.api";
import { toast } from "sonner";

interface ContentBlock {
  type: "paragraph" | "header" | "bullet";
  text: string;
  bold?: boolean;
  italic?: boolean;
  fontSize?: "small" | "medium" | "large";
}

export default function EditBlog() {
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: [] as ContentBlock[],
    image: "",
    status: "active" as "active" | "inactive" | "draft"
  });

  useEffect(() => {
    const slug = router.query.slug as string;
    if (slug) {
      fetchBlog(slug);
    }
  }, [router.query.slug]);

  const fetchBlog = async (slug: string) => {
    try {
      setLoading(true);
      const data = await getBlogBySlug(slug);
      setBlog(data);
      setFormData({
        title: data.title || "",
        content: data.content || [],
        image: data.image || "",
        status: (data.status || "active") as "active" | "inactive" | "draft"
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Không thể tải thông tin bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContentChange = (index: number, field: string, value: any) => {
    const newContent = [...formData.content];
    newContent[index] = {
      ...newContent[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const addContentBlock = (type: "paragraph" | "header" | "bullet" = "paragraph") => {
    const newBlock: ContentBlock = {
      type,
      text: type === "paragraph" ? "" : "",
      bold: false,
      italic: false,
      fontSize: "medium" as const
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const updateContentBlock = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newContent = [...prev.content];
      newContent[index] = {
        ...newContent[index],
        [field]: value
      };
      return {
        ...prev,
        content: newContent
      };
    });
  };

  const removeContentBlock = (index: number) => {
    const newContent = formData.content.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }
    
    if (formData.content.length === 0) {
      toast.error("Vui lòng thêm nội dung cho bài viết");
      return;
    }

    try {
      setLoading(true);
      const slug = router.query.slug as string;
      await updateBlog(slug, formData);
      toast.success("Cập nhật bài viết thành công");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Không thể cập nhật bài viết");
    } finally {
      setLoading(false);
    }
  };

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <textarea
              value={block.text}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập nội dung đoạn văn..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        );
      
      case "header":
        return (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={block.text}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập tiêu đề phụ..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case "bullet":
        return (
          <div key={index} className="mb-4">
            <input
              type="text"
              value={block.text}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập nội dung gạch đầu dòng..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading && !blog) {
    return (
      <AdminLayout title="Chỉnh sửa bài viết" description="Đang tải...">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin bài viết...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Chỉnh sửa bài viết" description="Chỉnh sửa bài viết blog">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bài viết</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  URL hình ảnh
                </label>
                <input
                  type="url"
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Đã xuất bản</option>
                  <option value="draft">Nháp</option>
                  <option value="inactive">Không hoạt động</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Nội dung</h2>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => addContentBlock("paragraph")}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Đoạn văn
                </button>
                <button
                  type="button"
                  onClick={() => addContentBlock("header")}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tiêu đề
                </button>
                <button
                  type="button"
                  onClick={() => addContentBlock("bullet")}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Gạch đầu dòng
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {formData.content.map((block, index) => (
                <div key={index} className="relative">
                  {block.type !== "paragraph" && (
                    <button
                      type="button"
                      onClick={() => removeContentBlock(index)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 rounded-full"
                      title="Xóa block"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {renderContentBlock(block, index)}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Cập nhật bài viết
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
