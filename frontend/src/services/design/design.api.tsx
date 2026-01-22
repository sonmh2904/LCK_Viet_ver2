const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export interface Design {
  _id: string
  projectName: string
  mainImage: string
  subImages: string[]
  investor: string
  implementationYear: number
  projectType: string
  address: string
  investmentLevel?: string
  landArea: number
  constructionArea: number
  floors: number
  functionality: string
  designUnit: string
  detailedDescription?: string
  categories: {
    _id: string
    name: string
    slug: string
  }
  createdAt: string
  updatedAt: string
}

export interface DesignResponse {
  code: number
  message: string
  data: Design
}

export interface DesignsResponse {
  code: number
  message: string
  data: {
    designs: Design[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      itemsPerPage: number
    }
  }
}

export interface CreateDesignData {
  projectName: string
  mainImage: string
  subImages?: string[]
  investor: string
  implementationYear: number
  projectType: string
  address: string
  investmentLevel?: string
  landArea: number
  constructionArea: number
  floors: number
  functionality: string
  designUnit: string
  detailedDescription?: string
  categories: string
}

export interface UpdateDesignData extends Partial<CreateDesignData> {}

class DesignAPI {
  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }

  // Get all designs with optional filters
  async getDesigns(params?: {
    page?: number
    limit?: number
    categories?: string
    projectType?: string
    implementationYear?: number
    search?: string
  }): Promise<DesignsResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.categories) queryParams.append('categories', params.categories)
    if (params?.projectType) queryParams.append('projectType', params.projectType)
    if (params?.implementationYear) queryParams.append('implementationYear', params.implementationYear.toString())
    if (params?.search) queryParams.append('search', params.search)

    const response = await fetch(`${API_BASE_URL}/designs?${queryParams}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `Failed to fetch designs: ${response.statusText}`)
    }

    return response.json()
  }

  // Get design by ID
  async getDesignById(id: string): Promise<DesignResponse> {
    const response = await fetch(`${API_BASE_URL}/designs/${id}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `Failed to fetch design: ${response.statusText}`)
    }

    return response.json()
  }

  // Get designs by category
  async getDesignsByCategory(categoryId: string, params?: {
    page?: number
    limit?: number
  }): Promise<DesignsResponse> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const response = await fetch(`${API_BASE_URL}/designs/category/${categoryId}?${queryParams}`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.message || `Failed to fetch designs by category: ${response.statusText}`)
    }

    return response.json()
  }

  // Create new design (admin only)
  async createDesign(data: CreateDesignData): Promise<DesignResponse> {
    const response = await fetch(`${API_BASE_URL}/designs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to create design: ${response.statusText}`)
    }

    return response.json()
  }

  // Update design (admin only)
  async updateDesign(id: string, data: UpdateDesignData): Promise<DesignResponse> {
    const response = await fetch(`${API_BASE_URL}/designs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to update design: ${response.statusText}`)
    }

    return response.json()
  }

  // Delete design (admin only)
  async deleteDesign(id: string): Promise<DesignResponse> {
    const response = await fetch(`${API_BASE_URL}/designs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      throw new Error(`Failed to delete design: ${response.statusText}`)
    }

    return response.json()
  }
}

export const designAPI = new DesignAPI()