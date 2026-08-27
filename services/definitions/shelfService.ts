import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  ShelfDto,
  ShelfCreateDto,
  ShelfUpdateDto,
} from "@/types/definitions/shelf";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/Shelves"; // Backend Controller adıyla tam uyumlu

export const shelfService = {
  /**
   * Tüm aktif rafları listeler. (Kullanıcı yetkisine göre filtrelenir)
   */
  getAllAsync: async (): Promise<ShelfDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<ShelfDto[]>>(API_URL);

    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir bloğun (Zone) içindeki tüm rafları listeler.
   */
  getByZoneIdAsync: async (zoneId: string): Promise<ShelfDto[]> => {
    const response = await axiosInstance.get<CustomResponseDto<ShelfDto[]>>(
      `${API_URL}/GetByZoneId/${zoneId}`,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen ID'ye sahip rafı getirir.
   */
  getByIdAsync: async (id: string): Promise<ShelfDto> => {
    const response = await axiosInstance.get<CustomResponseDto<ShelfDto>>(
      `${API_URL}/${id}`,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Sistemdeki tüm rafları pagination olarak getirir.
   */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<ShelfDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<ShelfDto>>
    >(`${API_URL}/Paged`, { params });

    return unwrapResponse(response.data);
  },

  /**
   * Sadece belirtilen Zone ID'sine ait rafları sayfalayarak getirir.
   */
  getPagedByZoneAsync: async (
    zoneId: string,
    params: PaginationParams,
  ): Promise<PagedResult<ShelfDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<ShelfDto>>
    >(`${API_URL}/PagedByZone/${zoneId}`, { params });

    return unwrapResponse(response.data);
  },

  /**
   * Depo bloğuna yeni bir raf oluşturur. (SuperAdmin veya Kendi Deposundaki Manager)
   */
  createAsync: async (createDto: ShelfCreateDto): Promise<ShelfDto> => {
    const response = await axiosInstance.post<CustomResponseDto<ShelfDto>>(
      API_URL,
      createDto,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Mevcut bir rafın fiziksel sınırlarını ve durumunu günceller.
   */
  updateAsync: async (updateDto: ShelfUpdateDto): Promise<ShelfDto> => {
    const response = await axiosInstance.put<CustomResponseDto<ShelfDto>>(
      API_URL,
      updateDto,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen rafı sistemden siler (pasife çeker). İçi dolu raflar silinemez.
   */
  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
