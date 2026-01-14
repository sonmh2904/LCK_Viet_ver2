"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/services/blog/blog.api";
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

export function BlogCreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: [] as ContentBlock[],
    image: "",
    status: "active" as "active" | "inactive" | "draft"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState<{ [key: number]: boolean }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề là bắt buộc";
    }
    
    if (formData.content.length === 0) {
      newErrors.content = "Vui lòng thêm ít nhất một nội dung";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
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

  const updateContentBlock = (index: number, field: string, value: any) => {
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

  const addContentBlock = (type: "paragraph" | "header" | "bullet" | "image" = "paragraph") => {
    const newBlock: ContentBlock = {
      type,
      text: type === "image" ? "" : "",
      bold: false,
      italic: false,
      fontSize: "medium",
      imageUrl: type === "image" ? "" : undefined,
      imageFile: type === "image" ? undefined : undefined,
      imagePreview: type === "image" ? "" : undefined
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
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
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload main image if a file is selected
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
      
      console.log("Creating blog with:", formData.title);
      const response = await createBlog({
        ...formData,
        image: imageUrl,
        content: updatedContent
      });
      console.log("Blog creation response:", response);
      
      if (response) {
        console.log("Blog created successfully, redirecting...");
        toast.success("Tạo bài viết thành công!");
        router.push("/admin/blogs");
      } else {
        console.log("Blog creation failed");
        toast.error("Tạo bài viết thất bại");
      }
    } catch (error) {
      console.error("Blog creation error:", error);
      toast.error(error instanceof Error ? error.message : "Tạo bài viết thất bại");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setContentUploading({});
    }
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-600">Đoạn văn</span>
              <button
                type="button"
                onClick={() => removeContentBlock(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa
              </button>
            </div>
            <textarea
              value={block.text || ""}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập nội dung đoạn văn..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              rows={4}
            />
          </div>
        );
      
      case "header":
        return (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-600">Tiêu đề phụ</span>
              <button
                type="button"
                onClick={() => removeContentBlock(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa
              </button>
            </div>
            <input
              type="text"
              value={block.text || ""}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập tiêu đề phụ..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        );
      
      case "bullet":
        return (
          <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-600">Gạch đầu dòng</span>
              <button
                type="button"
                onClick={() => removeContentBlock(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa
              </button>
            </div>
            <input
              type="text"
              value={block.text || ""}
              onChange={(e) => updateContentBlock(index, "text", e.target.value)}
              placeholder="Nhập nội dung gạch đầu dòng..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
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
                    disabled={isLoading || contentUploading[index]}
                  />
                </label>
              </div>
              
              {(block.imagePreview || block.imageUrl) && (
                <div className="relative inline-block">
                  <img 
                    src={block.imagePreview || block.imageUrl} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeContentImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    disabled={isLoading || contentUploading[index]}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo bài viết mới</h1>
        <p className="text-gray-600">Chia sẻ kiến thức và trải nghiệm của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bài viết</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Nhập tiêu đề bài viết..."
                disabled={isLoading}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
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
                      disabled={isLoading || isUploading}
                    />
                  </label>
                </div>
                
                {(imagePreview || formData.image) && (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview || formData.image} 
                      alt="Preview" 
                      className="h-48 w-48 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      disabled={isLoading || isUploading}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
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
                name="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                disabled={isLoading}
              >
                <option value="active">Đã xuất bản</option>
                <option value="draft">Nháp</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Nội dung bài viết</h2>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => addContentBlock("paragraph")}
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition"
              >
                + Đoạn văn
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("header")}
                className="px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium transition"
              >
                + Tiêu đề
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("bullet")}
                className="px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-medium transition"
              >
                + Gạch đầu dòng
              </button>
              <button
                type="button"
                onClick={() => addContentBlock("image")}
                className="px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 text-sm font-medium transition"
              >
                + Hình ảnh
              </button>
            </div>
          </div>

          {errors.content && (
            <p className="mb-4 text-sm text-red-600">{errors.content}</p>
          )}

          <div className="space-y-4">
            {formData.content.map((block, index) => renderContentBlock(block, index))}
          </div>

          {formData.content.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 mb-2">Chưa có nội dung nào</p>
              <p className="text-sm text-gray-400">Nhấn vào các nút ở trên để thêm nội dung</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/admin/blogs")}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
            disabled={isLoading}
          >
            Hủy
          </button>
          
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang tạo..." : "Tạo bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
