// types/auth.ts

// Giriş yaparken gönderilecek veriler
export interface LoginDto {
  email: string;
  password: string;
}

// Token yenileme ve çıkış işlemleri için
export interface RefreshTokenDto {
  token: string;
}

// Backend'den JWT ile birlikte gelecek olan kullanıcı özet bilgisi
export interface UserContextDto {
  id: string;
  fullName: string;
  email: string;
  role: string;
  warehouseId?: string | null;
}

// Login olduğumuzda backend'den dönecek olan tam yanıt
export interface TokenDto {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string; 
  refreshTokenExpiration: string;
  user: UserContextDto; 
}

// Aktif oturumları (cihaz/tarayıcı listesi) listelemek için
export interface ActiveSessionDto {
  id: string;
  deviceName: string;
  browser: string;
  ipAddress: string;
  createdDate: string;
  isCurrentSession: boolean;
  lastAccessed: string; 
}

// Şifre sıfırlama talebi için
export interface ForgotPasswordDto {
  email: string;
}

// Şifre sıfırlama onayı (Mailden gelen token ve yeni şifre) için
export interface ResetPasswordConfirmDto {
  token: string;
  newPassword: string;
}