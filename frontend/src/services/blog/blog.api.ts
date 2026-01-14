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
  content: any[];
  excerpt?: string;
  image: string;
  status: string;
  views?: number;
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
  content: any[];
  image?: string;
  status?: string;
}): Promise<Blog> => {
  try {
    const response = await instance.post("/blog", blogData);
    const data: Blog = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Đã xảy ra lỗi khi tạo bài viết");
  }
};

export const updateBlog = async (
  slug: string,
  updateData: {
    title?: string;
    content?: any[];
    image?: string;
    status?: string;
  }
): Promise<Blog> => {
  try {
    const response = await instance.put(`/blog/${slug}`, updateData);
    const data: Blog = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating blog ${slug}:`, error);
    throw new Error("Đã xảy ra lỗi khi cập nhật bài viết");
  }
};

export const deleteBlog = async (slug: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`/blog/${slug}`);
    const data = await response.json();
    return data.code === 200 || true; // Backend returns success flag or true
  } catch (error) {
    console.error(`Error deleting blog ${slug}:`, error);
    throw new Error("Đã xảy ra lỗi khi xóa bài viết");
  }
};

// Export all types
export type { Blog as BlogType };