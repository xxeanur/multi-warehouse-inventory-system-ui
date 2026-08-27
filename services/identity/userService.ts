// services/userService.ts

import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  UserDto,
  UserCreateDto,
  UserUpdateDto,
  ChangePasswordDto,
  UserProfileUpdateDto,
  UserFilterDto, // YENİ EKLENDİ
} from "@/types/identity/user";
import { CustomResponseDto } from "@/types/common/common";
import { AuditLogDto } from "@/types/common/audit";

const API_URL = "/Users";

export const userService = {
  /**
   * Sisteme yeni bir kullanıcı (personel veya müdür) ekler.
   */
  createAsync: async (createDto: UserCreateDto): Promise<UserDto> => {
    const response = await axiosInstance.post<CustomResponseDto<UserDto>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Mevcut bir kullanıcının temel bilgilerini ve yetkilerini günceller.
   */
  updateAsync: async (updateDto: UserUpdateDto): Promise<UserDto> => {
    const response = await axiosInstance.put<CustomResponseDto<UserDto>>(
      API_URL,
      updateDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Giriş yapmış kullanıcının kendi profil bilgilerini (isim, telefon vb.) günceller.
   */
  updateProfileAsync: async (
    profileDto: UserProfileUpdateDto,
  ): Promise<UserDto> => {
    const response = await axiosInstance.put<CustomResponseDto<UserDto>>(
      `${API_URL}/me`,
      profileDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Yönetici yetkisiyle, bir personelin şifresini doğrudan sıfırlar.
   */
  resetPasswordAsync: async (
    id: string,
    newPassword: string,
  ): Promise<void> => {
    await axiosInstance.patch(`${API_URL}/${id}/reset-password`, {
      newPassword,
    });
  },

  /**
   * Belirtilen ID'ye sahip kullanıcının tüm detaylarını getirir.
   */
  getByIdAsync: async (id: string): Promise<UserDto> => {
    const response = await axiosInstance.get<CustomResponseDto<UserDto>>(
      `${API_URL}/${id}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Filtre parametrelerine (Aktif/Pasif, Arama, Depo, Rol) göre kullanıcıları listeler.
   */
  getAllAsync: async (filter?: UserFilterDto): Promise<UserDto[]> => {
    // Objedeki değerleri URL Query parametresine çeviriyoruz (Örn: ?IsActive=true&SearchText=ahmet)
    const params = new URLSearchParams();
    if (filter?.searchText) params.append("SearchText", filter.searchText);
    if (filter?.warehouseId && filter.warehouseId !== "ALL")
      params.append("WarehouseId", filter.warehouseId);
    if (filter?.role !== undefined && filter.role !== "ALL")
      params.append("Role", filter.role.toString());
    if (filter?.isActive !== undefined)
      params.append("IsActive", filter.isActive.toString());

    const response = await axiosInstance.get<CustomResponseDto<UserDto[]>>(
      `${API_URL}?${params.toString()}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Kullanıcının durumunu değiştirir (Aktif ise Pasif yapar, Pasif ise Aktif yapar).
   */
  toggleStatusAsync: async (id: string): Promise<void> => {
    const response = await axiosInstance.patch<CustomResponseDto<null>>(
      `${API_URL}/${id}/toggle-status`,
    );
    unwrapResponse(response.data);
  },

  /**
   * Sisteme giriş yapmış mevcut kullanıcının bilgilerini getirir.
   */
  getMeAsync: async (): Promise<UserDto> => {
    const response = await axiosInstance.get<CustomResponseDto<UserDto>>(
      `${API_URL}/me`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Giriş yapmış kullanıcının kendi şifresini değiştirmesini sağlar.
   */
  changePasswordAsync: async (dto: ChangePasswordDto): Promise<void> => {
    const response = await axiosInstance.put<CustomResponseDto<null>>(
      `${API_URL}/change-password`,
      dto,
    );
    unwrapResponse(response.data);
  },

  /**
   * Kullanıcının e-posta adresini değiştirmesi için talep (token) oluşturur.
   */
  requestEmailChangeAsync: async (newEmail: string): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<null>>(
      `${API_URL}/request-email-change`,
      { newEmail },
    );
    unwrapResponse(response.data);
  },

  /**
   * E-postaya gönderilen onay linki ile e-posta değiştirme işlemini tamamlar.
   */
  confirmEmailAsync: async (token: string): Promise<void> => {
    const response = await axiosInstance.get<CustomResponseDto<null>>(
      `${API_URL}/confirm-email?token=${token}`,
    );
    unwrapResponse(response.data);
  },

  /**
   * Giriş yapmış kullanıcının kendi hesabına ait güvenlik loglarını (şifre değişimi, giriş vb.) getirir.
   */
  getMySecurityLogsAsync: async (): Promise<AuditLogDto[]> => {
    const response = await axiosInstance.get<CustomResponseDto<AuditLogDto[]>>(
      `${API_URL}/my-security-logs`,
    );
    return unwrapResponse(response.data);
  },
};
