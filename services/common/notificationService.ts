// services/notificationService.ts

import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { CustomResponseDto } from "@/types/common/common";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { NotificationDto } from "@/types/common/notification";

const API_URL = "/Notifications";

export const notificationService = {
  /**
   * İlgili bildirimin detaylarını getirir.
   */
  getByIdAsync: async (id: string): Promise<NotificationDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<NotificationDto>
    >(`${API_URL}/${id}`);
    return unwrapResponse(response.data);
  },

  /**
   * Kullanıcının tüm bildirimlerini (sayfalama olmadan) getirir.
   */
  getMyNotificationsAsync: async (): Promise<NotificationDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<NotificationDto[]>
    >(`${API_URL}/my-notifications`);
    return unwrapResponse(response.data);
  },

  /**
   * Kullanıcının bildirimlerini 5'er 5'er (veya istenilen boyutta) sayfalamalı olarak getirir.
   */
  getMyPagedNotificationsAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<NotificationDto>> => {
    // Pagination parametrelerini dinamik olarak URL query string'e çeviriyoruz
    const queryParams = new URLSearchParams({
      pageNumber: params.pageNumber.toString(),
      pageSize: params.pageSize.toString(),
    });

    if (params.searchTerm) {
      queryParams.append("searchTerm", params.searchTerm);
    }
    if (params.orderBy) {
      queryParams.append("orderBy", params.orderBy);
    }

    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<NotificationDto>>
    >(`${API_URL}/my-notifications/paged?${queryParams.toString()}`);
    return unwrapResponse(response.data);
  },

  /**
   * Zil ikonunda gösterilmek üzere okunmamış bildirim sayısını getirir.
   */
  getMyUnreadCountAsync: async (): Promise<number> => {
    const response = await axiosInstance.get<CustomResponseDto<number>>(
      `${API_URL}/my-unread-count`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen bildirimi okundu olarak işaretler.
   */
  markAsReadAsync: async (id: string): Promise<void> => {
    const response = await axiosInstance.patch<CustomResponseDto<null>>(
      `${API_URL}/${id}/mark-as-read`,
    );
    unwrapResponse(response.data);
  },

  /**
   * Kullanıcının tüm okunmamış bildirimlerini okundu olarak işaretler.
   */
  markAllAsReadAsync: async (): Promise<void> => {
    const response = await axiosInstance.patch<CustomResponseDto<null>>(
      `${API_URL}/mark-all-as-read`,
    );
    unwrapResponse(response.data);
  },

  /**
   * Belirtilen bildirimi sistemden siler (Soft Delete).
   */
  removeAsync: async (id: string): Promise<void> => {
    const response = await axiosInstance.delete<CustomResponseDto<null>>(
      `${API_URL}/${id}`,
    );
    unwrapResponse(response.data);
  },
};
