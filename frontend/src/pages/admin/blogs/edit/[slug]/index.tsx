"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  ArrowLeft,
  Save,
  Plus,
  X
} from "lucide-react";
import Image from "next/image";
import { getBlogBySlug, updateBlog } from "@/services/blog/blog.api";
import { uploadImage } from "@/services/upload/upload.service";
import { toast } from "sonner";

interface ContentBlock {
  type: "paragraph" | "header" | "bullet" | "image";
  text?: string;
  bold?: boolean;
  italic?: boolean;
  fontSize?: "small" | "medium" | "large";
  imageUrl?: string;
  imageFile?: File;
  imagePreview?: string;
}

export default function EditBlog() {
  const router = useRouter();
  const [blog, setBlog] = useState<{
    title: string;
    content: ContentBlock[];
    image: string;
    status: string;
    isHighlight?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState<{ [key: number]: boolean }>({});
  const [formData, setFormData] = useState({
    title: "",
    content: [] as ContentBlock[],
    image: "",
    status: "active" as "active" | "inactive" | "draft",
    isHighlight: false
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
      setBlog(data as {
        title: string;
        content: ContentBlock[];
        image: string;
        status: string;
        isHighlight?: boolean;
      });
      setFormData({
        title: data.title || "",
        content: (data.content as ContentBlock[]) || [],
        image: data.image || "",
        status: (data.status || "active") as "active" | "inactive" | "draft",
        isHighlight: data.isHighlight || false
      });
      // Set existing image as preview
      if (data.image) {
        setImagePreview(data.image);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Không thể tải thông tin bài viết");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Vui lòng chọn file hình ảnh');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước hình ảnh không được vượt quá 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any existing image URL
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleContentImageChange = (index: number, file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file hình ảnh');
      return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước hình ảnh không được vượt quá 5MB');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const newContent = [...formData.content];
      newContent[index] = {
        ...newContent[index],
        imageFile: file,
        imagePreview: e.target?.result as string,
        imageUrl: '' // Clear existing URL if any
      };
      setFormData(prev => ({
        ...prev,
        content: newContent
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeContentImage = (index: number) => {
    const newContent = [...formData.content];
    newContent[index] = {
      ...newContent[index],
      imageFile: undefined,
      imagePreview: '',
      imageUrl: ''
    };
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const addContentBlock = (type: "paragraph" | "header" | "bullet" | "image" = "paragraph") => {
    const newBlock: ContentBlock = {
      type,
      text: type === "image" ? "" : "",
      bold: false,
      italic: false,
      fontSize: "medium" as const,
      imageUrl: type === "image" ? "" : undefined,
      imageFile: type === "image" ? undefined : undefined,
      imagePreview: type === "image" ? "" : undefined
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const updateContentBlock = (index: number, field: string, value: string | boolean | File) => {
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
      
      let imageUrl = formData.image;
      
      // Upload new main image if a file is selected
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(imageFile);
        setIsUploading(false);
      }
      
      // Upload content images
      const updatedContent = [...formData.content];
      for (let i = 0; i < updatedContent.length; i++) {
        const block = updatedContent[i];
        if (block.type === 'image' && block.imageFile && !block.imageUrl) {
          setContentUploading(prev => ({ ...prev, [i]: true }));
          const uploadedUrl = await uploadImage(block.imageFile);
          updatedContent[i] = {
            ...block,
            imageUrl: uploadedUrl,
            imageFile: undefined
          };
          setContentUploading(prev => ({ ...prev, [i]: false }));
        }
      }
      
      await updateBlog(slug, {
        ...formData,
        image: imageUrl,
        content: updatedContent
      });
      toast.success("Cập nhật bài viết thành công");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật bài viết");
    } finally {
      setLoading(false);
      setIsUploading(false);
      setContentUploading({});
    }
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
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
              value={block.text || ""}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập nội dung gạch đầu dòng..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );
      
      case "image":
        return (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-600">Hình ảnh</span>
              <button
                type="button"
                onClick={() => removeContentBlock(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-3 pb-4">
                    <svg className="w-6 h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">Nhấn để tải lên</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleContentImageChange(index, file);
                    }}
                    className="hidden"
                    disabled={loading || contentUploading[index]}
                  />
                </label>
              </div>
              
              {(block.imagePreview || block.imageUrl) && (
                <div className="relative inline-block">
                  <Image 
                    src={block.imagePreview || block.imageUrl || ''} 
                    alt="Preview" 
                    width={128}
                    height={128}
                    className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeContentImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    disabled={loading || contentUploading[index]}
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {contentUploading[index] && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="text-white text-xs">Đang tải lên...</div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                  Hình ảnh bài viết
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Nhấn để tải lên</span> hoặc kéo và thả
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, WEBP (Tối đa 5MB)</p>
                      </div>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={loading || isUploading}
                      />
                    </label>
                  </div>
                  
                  {(imagePreview || formData.image) && (
                    <div className="relative inline-block">
                      <Image 
                        src={imagePreview || formData.image || ''} 
                        alt="Preview" 
                        width={192}
                        height={192}
                        className="h-48 w-48 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        disabled={loading || isUploading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                          <div className="text-white text-sm">Đang tải lên...</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nổi bật
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isHighlight"
                    checked={formData.isHighlight}
                    onChange={(e) => handleInputChange("isHighlight", e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-2"
                  />
                  <label htmlFor="isHighlight" className="ml-2 text-sm text-gray-700">
                    Đánh dấu bài viết này là nổi bật
                  </label>
                </div>
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
                <button
                  type="button"
                  onClick={() => addContentBlock("image")}
                  className="flex items-center px-3 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Hình ảnh
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
