"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { 
  FileText, 
  LogOut,
  Plus,
  Palette,
  FolderTree,
  Phone
} from "lucide-react";

interface MenuItem {
  href: string;
  icon: any;
  label: string;
  description: string;
}

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ fullname?: string; email: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Kiểm tra authentication
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token || !userData) {
      router.push("/dang-nhap");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Kiểm tra role admin
    if (parsedUser.role !== "admin") {
      router.push("/");
      return;
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/dang-nhap");
  };

  const menuItems = [
    {
      href: "/admin/information",
      icon: Phone,
      label: "Quản lý thông tin",
      description: "Thông tin liên hệ khách hàng"
    },
    {
      href: "/admin/blogs",
      icon: FileText,
      label: "Quản lý bài viết",
      description: "Tất cả bài viết"
    },
    {
      href: "/admin/designs",
      icon: Palette,
      label: "Quản lý thiết kế",
      description: "Thiết kế nội thất & ngoại thất"
    },
    {
      href: "/admin/categories",
      icon: FolderTree,
      label: "Quản lý danh mục",
      description: "Quản lý tất cả danh mục"
    },
    
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isActiveRoute = (href: string) => {
    return router.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-900">LCK Admin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 hidden sm:block">
                Xin chào, {user.fullname || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full pt-16 lg:pt-0 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <button
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className={`
                      w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'}`} />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-10 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Page Header */}
              {(title || description) && (
                <div className="mb-8">
                  {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
                  {description && <p className="text-gray-600 mt-1">{description}</p>}
                </div>
              )}
              
              {/* Page Content */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
