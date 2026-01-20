"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdminLayout } from "@/components/layout/admin-layout";
import { 
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  Edit,
  Save,
  X
} from "lucide-react";
import { getInformationById, updateInformation, Information } from "@/services/information/information.api";
import { toast } from "sonner";

export default function InformationDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [information, setInformation] = useState<Information | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<"pending" | "completed">("pending");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchInformation();
    }
  }, [id]);

  const fetchInformation = async () => {
    try {
      setLoading(true);
      const response = await getInformationById(id as string);
      const result = await response.json();
      if (result.data) {
        setInformation(result.data);
        setEditStatus(result.data.status);
      }
    } catch (error) {
      toast.error("Không thể tải thông tin chi tiết");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!information) return;
    
    try {
      setUpdating(true);
      await updateInformation(information._id, { status: editStatus });
      toast.success("Cập nhật trạng thái thành công");
      setIsEditing(false);
      fetchInformation();
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-2" />
            Đã xử lý
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-4 h-4 mr-2" />
            Chờ xử lý
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Chi tiết thông tin" description="Xem và chỉnh sửa thông tin liên hệ">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!information) {
    return (
      <AdminLayout title="Chi tiết thông tin" description="Xem và chỉnh sửa thông tin liên hệ">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy thông tin</h3>
          <p className="text-gray-600 mb-4">Thông tin bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={() => router.push("/admin/information")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Chi tiết thông tin" description="Xem và chỉnh sửa thông tin liên hệ">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/information")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </button>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{information.fullName}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Ngày tạo: {new Date(information.createdAt).toLocaleDateString("vi-VN")}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Cập nhật: {new Date(information.updatedAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as "pending" | "completed")}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="completed">Đã xử lý</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={updating}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updating ? "Đang lưu..." : "Lưu"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditStatus(information.status);
                    }}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hủy
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  {getStatusBadge(information.status)}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Chỉnh sửa trạng thái
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Information Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Thông tin liên hệ
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <p className="text-gray-900 font-medium">{information.fullName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <div className="flex items-center text-gray-900">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                {information.phoneNumber}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
              <div className="flex items-center text-gray-900">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {information.province || "—"}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
              <div className="flex items-center text-gray-900">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {information.district || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Mô tả yêu cầu
          </h2>
          
          <div className="text-gray-900 whitespace-pre-wrap">
            {information.description || "Không có mô tả"}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử thay đổi</h2>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Thông tin được tạo</p>
              <p className="text-sm text-gray-600">
                {new Date(information.createdAt).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          
          {information.updatedAt !== information.createdAt && (
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Edit className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Thông tin được cập nhật</p>
                <p className="text-sm text-gray-600">
                  {new Date(information.updatedAt).toLocaleString("vi-VN")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
