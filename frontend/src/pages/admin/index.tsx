import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalViews: 0,
    recentBlogs: 0
  });

  useEffect(() => {
    // Load stats (mock data cho demo)
    setStats({
      totalBlogs: 12,
      totalViews: 1248,
      recentBlogs: 3
    });
  }, []);

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Tổng quan về trang web"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">{stats.totalBlogs}</div>
            <div className="text-sm text-gray-600">Tổng bài viết</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+8%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Tổng lượt xem</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+24%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">{stats.recentBlogs}</div>
            <div className="text-sm text-gray-600">Bài viết mới</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <BarChart3 className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">0%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-sm text-gray-600">Tỷ lệ tương tác</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bài viết gần đây</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Hướng dẫn sử dụng React Hook</h4>
                  <p className="text-xs text-gray-500">2 giờ trước</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê nhanh</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Lượt truy cập hôm nay</span>
              <span className="text-sm font-medium text-gray-900">234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bình luận mới</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Người dùng mới</span>
              <span className="text-sm font-medium text-gray-900">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tỷ lệ thoát</span>
              <span className="text-sm font-medium text-gray-900">32%</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
