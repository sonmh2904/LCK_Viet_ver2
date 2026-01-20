import instance from "../customizeAPI";

export interface BlogAuthor {
  _id: string;
  fullname: string;
  email: string;
}

export interface BlogImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: unknown[];
  excerpt?: string;
  image: string;
  status: string;
  views?: number;
  isHighlight?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  code: number;
  message: string;
  data: Blog[];
}

export interface SingleBlogResponse {
  code: number;
  message: string;
  data: Blog;
}

// Blog APIs
export const getAllBlogs = async (queryParams?: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}): Promise<Blog[]> => {
  try {
    let url = "/blog";
    if (queryParams) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
      url += `?${params.toString()}`;
    }
    
    const response = await instance.get(url);
    const result: BlogListResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Không thể tải danh sách bài viết");
  }
};

export const getBlogBySlug = async (slug: string): Promise<Blog> => {
  try {
    const response = await instance.get(`/blog/${slug}`);
    const result: SingleBlogResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    throw new Error("Không thể tải thông tin bài viết");
  }
};

export const getTopViewedBlogs = async (limit: number = 5): Promise<Blog[]> => {
  try {
    const url = `/blog/top-viewed?limit=${limit}`;
    const response = await instance.get(url);
    const result: BlogListResponse = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching top viewed blogs:", error);
    return [];
  }
};

export const incrementBlogViews = async (blogId: string): Promise<void> => {
  try {
    await instance.post(`/blog/slug/${blogId}/views`);
  } catch (error) {
    console.error(`Error incrementing views for blog ${blogId}:`, error);
    // Don't throw error as this shouldn't block the user experience
  }
};

export const createBlog = async (blogData: {
  title: string;
  content: unknown[];
  image?: string;
  status?: string;
  isHighlight?: boolean;
}): Promise<Blog> => {
  try {
    console.log("Creating blog with data:", blogData);
    const response = await instance.post("/blog", blogData);
    
    console.log("Create blog response status:", response.status);
    console.log("Create blog response headers:", Object.fromEntries(response.headers.entries()));
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error("Non-JSON response from create blog:", text.substring(0, 500));
      throw new Error("Server returned non-JSON response");
    }
    
    const result = await response.json();
    console.log("Blog creation result:", result);
    console.log("Result type:", typeof result);
    console.log("Result keys:", Object.keys(result));
    console.log("Has code property:", 'code' in result);
    console.log("Has data property:", 'data' in result);
    console.log("Has _id property:", '_id' in result);
    
    // Handle both direct Blog object and wrapped response
    if (result.code && result.data) {
      console.log("Using wrapped success response format");
      return result.data;
    } else if (result._id) {
      console.log("Using direct Blog object format");
      return result;
    } else if (result.code && !result.data) {
      console.error("Backend returned error response:", result);
      throw new Error(result.message || 'Server error occurred');
    } else {
      // Log the actual response for debugging
      console.error("Unexpected response format. Full response:", JSON.stringify(result, null, 2));
      throw new Error(`Invalid response format. Expected {code, data} or {_id} but got: ${JSON.stringify(Object.keys(result))}`);
    }
  } catch {
    throw new Error("Đã xảy ra lỗi khi tạo bài viết");
  }
};

export const updateBlog = async (
  slug: string,
  updateData: {
    title?: string;
    content?: unknown[];
    image?: string;
    status?: string;
    isHighlight?: boolean;
  }
): Promise<Blog> => {
  try {
    console.log("Updating blog with slug:", slug, "data:", updateData);
    const response = await instance.put(`/blog/${slug}`, updateData);
    
    console.log("Update blog response status:", response.status);
    console.log("Update blog response headers:", Object.fromEntries(response.headers.entries()));
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error("Non-JSON response from update blog:", text.substring(0, 500));
      throw new Error("Server returned non-JSON response");
    }
    
    const result = await response.json();
    console.log("Blog update result:", result);
    
    // Handle both direct Blog object and wrapped response
    if (result && typeof result === 'object') {
      // Check if it's a direct blog object or wrapped response
      if (result.code && result.data) {
        // Wrapped response format
        console.log("Using wrapped success response format");
        return result.data;
      } else if (result._id) {
        // Direct Blog object
        console.log("Using direct Blog object format");
        return result;
      } else if (result.code && !result.data) {
        // Error response format (has code but no data)
        console.error("Backend returned error response:", result);
        throw new Error(result.message || 'Server error occurred');
      } else {
        // Log the actual response for debugging
        console.error("Unexpected response format. Full response:", JSON.stringify(result, null, 2));
        throw new Error(`Invalid response format. Expected {code, data} or {_id} but got: ${JSON.stringify(Object.keys(result))}`);
      }
    } else {
      throw new Error("Invalid response format - not an object");
    }
  } catch {
    throw new Error("Đã xảy ra lỗi khi cập nhật bài viết");
  }
};

export const deleteBlog = async (slug: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`/blog/${slug}`);
    const data = await response.json();
    return data.code === 200 || true; // Backend returns success flag or true
  } catch {
    throw new Error("Đã xảy ra lỗi khi xóa bài viết");
  }
};

// Export all types
export type { Blog as BlogType };