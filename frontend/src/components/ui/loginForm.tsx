"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth/auth.api";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/auth/authReducer";
import { toast } from "sonner";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const router = useRouter();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", formData.email);
      const response = await login(formData.email, formData.password);
      console.log("Login response:", response);
      
      if (response.code === 200 && response.data) {
        console.log("Login successful, storing data...");
        
        // Backend returns single token, not accessToken/refreshToken
        const token = response.data.token;
        
        dispatch(loginAction({
          accessToken: token || "",
          refreshToken: token || "" // Use same token for both since backend only provides one
        }));
        
        // Store token and user data in localStorage for admin page authentication
        localStorage.setItem("token", token || "");
        
        // Create user object with admin role from backend response
        const userData = {
          id: response.data.user?._id || "1",
          email: response.data.user?.email || formData.email,
          fullName: response.data.user?.fullname || "Admin User",
          role: response.data.user?.role || "admin"
        };
        localStorage.setItem("user", JSON.stringify(userData));
        
        console.log("Data stored, redirecting to admin...");
        toast.success("Login successful!");
        router.push("/admin");
      } else {
        console.log("Login failed:", response.message);
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="mb-6">
          <img 
            src="/highlight/hl8.jpg" 
            alt="LCK Design" 
            className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h1>
        <p className="text-gray-600">Đăng nhập vào tài khoản của bạn</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Địa chỉ email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập email của bạn"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập mật khẩu của bạn"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
