"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { BlogCreateForm } from "@/components/ui/blogCreateForm";

export default function CreateBlog() {
  return (
    <AdminLayout title="Tạo bài viết mới" description="Tạo bài viết blog mới">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <BlogCreateForm />
      </div>
    </AdminLayout>
  );
}
