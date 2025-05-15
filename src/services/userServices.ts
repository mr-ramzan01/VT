import axios from "axios";
import { handleApiError, logError } from "../utils/errorHandler";

const AuthApiUrl = "https://5717-2401-4900-8841-516d-50c0-90b7-f273-67e.ngrok-free.app/auth";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// Define response data types
interface AuthResponseData {
  token?: string;
  user?: {
    id: string;
    email?: string;
    phone?: string;
    role: string;
  };
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string | number;
    details?: unknown;
  };
  status?: number;
}

export const login = async(email: string | null, phone: number | null, password: string): Promise<ApiResponse<AuthResponseData>> => {
  try {
    const response = await axios.post(`${AuthApiUrl}/login`, {
      email,
      phone,
      password
    }, {
      headers: getHeaders()
    });
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    logError(error, 'login');
    return handleApiError(error);
  }
}

// email,password,role,individualType,phone

export const signUp = async(email: string, phone: number | null, password: string, role: string, individualType: string | null): Promise<ApiResponse<AuthResponseData>> => {
  try {
    const response = await axios.post(`${AuthApiUrl}/register`, {
      email,
      phone,
      password,
      role,
      individualType
    }, {
      headers: getHeaders()
    });
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    logError(error, 'signUp');
    return handleApiError(error);
  }
}

export const forgotPassword = async(email: string): Promise<ApiResponse<{message: string}>> => {
  try {
    const response = await axios.post(`${AuthApiUrl}/forgot-password`, {
      email
    }, {
      headers: getHeaders()
    });
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    logError(error, 'forgotPassword');
    return handleApiError(error);
  }
}

export const verifyOtp = async(isLoggingIn: boolean, otp: string): Promise<ApiResponse<{verified: boolean; token?: string}>> => {
  try {
    const response = await axios.post(`${AuthApiUrl}/verify-otp`, {
      isLoggingIn,
      otp
    }, {
      headers: getHeaders()
    });
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    logError(error, 'verifyOtp');
    return handleApiError(error);
  }
}