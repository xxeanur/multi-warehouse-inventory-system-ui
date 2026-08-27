export enum UserRole {
  SuperAdmin = 0,
  WarehouseManager = 1,
  Staff = 2,
}

export interface UserDto {
  id: string; // Guid
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string;
  avatarUrl: string;
  warehouseName: string; 
  createdDate: string; // DateTime
  isActive: boolean;
  warehouseId?: string | null;
  receiveEmailNotifications: boolean;
  receiveInAppNotifications: boolean;
}

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: UserRole;
  warehouseId?: string | null;
  phone?: string; 
}

export interface UserUpdateDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  warehouseId?: string | null;
  phone: string;
  avatarUrl: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface UserProfileUpdateDto {
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
  receiveEmailNotifications: boolean;
  receiveInAppNotifications: boolean;
}

// YENİ EKLENDİ: Backend'deki UserFilterDto'nun Frontend karşılığı
export interface UserFilterDto {
  searchText?: string;
  warehouseId?: string;
  role?: UserRole | string;
  isActive?: boolean;
}