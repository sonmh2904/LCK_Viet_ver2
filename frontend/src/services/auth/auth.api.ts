import instance from "../customizeAPI";

// TypeScript interfaces for API responses
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
}

export interface VerifyEmailRequest {
    email: string;
    otp: string;
}

export interface ForgotPasswordRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface AuthResponse {
    code: number;
    message: string;
    data?: {
        user?: {
            _id: string;
            email: string;
            fullname: string;
            role: string;
        };
        token?: string;
    };
}

export interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
}

// Authentication API functions
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        console.log("Making API call to login with:", { email, password: "***" });
        const response = await instance.post("/auth/login", { email, password });
        console.log("API response status:", response.status);
        const data = await response.json();
        console.log("API response data:", data);
        return data;
    } catch (error) {
        console.error("API call failed:", error);
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const verifyEmail = async (email: string, otp: string): Promise<ApiResponse> => {
    try {
        const response = await instance.post("/auth/verify-email", { email, otp });
        return await response.json();
    } catch (error) {
        throw new Error('Email verification failed. Please check your OTP.');
    }
};

export const resendOtp = async (email: string): Promise<ApiResponse> => {
    try {
        const response = await instance.post("/auth/resend-otp", { email });
        return await response.json();
    } catch (error) {
        throw new Error('Failed to resend OTP. Please try again.');
    }
};

export const requestForgotPassword = async (email: string): Promise<ApiResponse> => {
    try {
        const response = await instance.post("/auth/request-forgot-password", { email });
        return await response.json();
    } catch (error) {
        throw new Error('Failed to send password reset email.');
    }
};

export const forgotPasswordOtp = async (email: string, otp: string): Promise<ApiResponse> => {
    try {
        const response = await instance.post("/auth/forgot-password-otp", { email, otp });
        return await response.json();
    } catch (error) {
        throw new Error('OTP verification failed. Please check your OTP.');
    }
};

export const forgotPassword = async (email: string, password: string): Promise<ApiResponse> => {
    try {
        const response = await instance.post("/auth/forgot-password", { email, password });
        return await response.json();
    } catch (error) {
        throw new Error('Password reset failed. Please try again.');
    }
};

export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
    try {
        const response = await instance.post("/auth/refresh-token", { refreshToken });
        return await response.json();
    } catch (error) {
        throw new Error('Token refresh failed. Please login again.');
    }
};

export const getUserProfile = async (): Promise<ApiResponse> => {
    try {
        const response = await instance.get("/auth/profile");
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch user profile.');
    }
};

