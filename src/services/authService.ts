// src/services/authService.ts
import api from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
  ProfileUpdateRequest,
  User,
} from '../types/auth';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/users/login/', credentials);
  const data = response.data;
  if (data.access) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/users/register/', userData);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const refresh = localStorage.getItem('refresh_token');
  try {
    await api.post('/users/logout/', { refresh });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/users/profile/');
  return response.data;
};

export const updateProfile = async (data: ProfileUpdateRequest): Promise<User> => {
  const response = await api.patch<User>('/users/profile/', data);
  return response.data;
};

export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await api.post<ChangePasswordResponse>('/users/change-password/', data);
  return response.data;
};

export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>('/users/forgot-password/', data);
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>('/users/reset-password/', data);
  return response.data;
};

export const verifyEmail = async (
  data: VerifyEmailRequest
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>('/users/verify-email/', data);
  return response.data;
};

export const resendVerification = async (
  data: ResendVerificationRequest
): Promise<ResendVerificationResponse> => {
  const response = await api.post<ResendVerificationResponse>('/users/resend-verification/', data);
  return response.data;
};

export const refreshToken = async (): Promise<{ access: string }> => {
  const refresh = localStorage.getItem('refresh_token');
  const response = await api.post<{ access: string }>('/users/token/refresh/', { refresh });
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
  }
  return response.data;
};

/**
 * Upload a profile picture (avatar) for the current user.
 * The file is sent as multipart/form-data under the field name "profile_picture".
 * Returns the updated user object.
 */
export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('profile_picture', file);
  
  const response = await api.patch<User>('/users/profile/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  // Update stored user data
  const updatedUser = response.data;
  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};