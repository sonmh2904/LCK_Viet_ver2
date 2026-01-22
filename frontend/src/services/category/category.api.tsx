const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface Category {
  _id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoriesResponse {
  code: number
  message: string
  data: {
    categories: Category[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
    }
  }
}

export interface CategoryResponse {
  code: number
  message: string
  data: Category
}

class CategoryAPI {
  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  // Get all categories
  async getAllCategories(params?: {
    page?: number
    limit?: number
    isActive?: boolean
  }): Promise<CategoriesResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString())

    const response = await fetch(`${API_BASE_URL}/categories?${queryParams}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `Failed to fetch categories: ${response.statusText}`)
    }

    return response.json()
  }

  // Get category by ID
  async getCategoryById(id: string): Promise<CategoryResponse> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `Failed to fetch category: ${response.statusText}`)
    }

    return response.json()
  }
}

export const categoryAPI = new CategoryAPI()
