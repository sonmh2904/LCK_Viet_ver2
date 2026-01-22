import api from '../customizeAPI';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  isActive?: boolean;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// Lấy tất cả categories
export const getCategories = async (params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
}): Promise<ApiResponse<CategoriesResponse>> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

  const response = await api.get(`/categories?${queryParams.toString()}`);
  const data = await response.json();
  return data;
};

// Lấy category theo ID
export const getCategoryById = async (id: string): Promise<ApiResponse<Category>> => {
  const response = await api.get(`/categories/${id}`);
  const data = await response.json();
  return data;
};

// Tạo category mới
export const createCategory = async (categoryData: CreateCategoryRequest): Promise<ApiResponse<Category>> => {
  const response = await api.post('/categories', categoryData);
  const data = await response.json();
  return data;
};

// Cập nhật category
export const updateCategory = async (
  id: string, 
  categoryData: UpdateCategoryRequest
): Promise<ApiResponse<Category>> => {
  const response = await api.put(`/categories/${id}`, categoryData);
  const data = await response.json();
  return data;
};

// Xóa category (soft delete)
export const deleteCategory = async (id: string): Promise<ApiResponse<Category>> => {
  const response = await api.delete(`/categories/${id}`);
  const data = await response.json();
  return data;
};

// Xóa vĩnh viễn category
export const hardDeleteCategory = async (id: string): Promise<ApiResponse<Category>> => {
  const response = await api.delete(`/categories/${id}/hard`);
  const data = await response.json();
  return data;
};