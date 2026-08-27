import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  WarehouseDto,
  WarehouseCreateDto,
  WarehouseUpdateDto,
} from "@/types/definitions/warehouse";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/Warehouses";

export const warehouseService = {
  /** Sistemdeki tüm aktif depoları listeler. */
  getAllAsync: async (): Promise<WarehouseDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<WarehouseDto[]>>(API_URL);
    return unwrapResponse(response.data);
  },

  /** Sistemdeki depoları sayfalama (Pagination) destekli olarak getirir. */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<WarehouseDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<WarehouseDto>>
    >(`${API_URL}/Paged`, { params });
    return unwrapResponse(response.data);
  },

  /** Belirtilen ID'ye sahip depoyu detaylarıyla getirir. */
  getByIdAsync: async (id: string): Promise<WarehouseDto> => {
    const response = await axiosInstance.get<CustomResponseDto<WarehouseDto>>(
      `${API_URL}/${id}`,
    );
    return unwrapResponse(response.data);
  },

  /** Sisteme yeni bir depo ekler. Başlangıç doluluk oranı 0'dır. (Sadece SuperAdmin) */
  createAsync: async (createDto: WarehouseCreateDto): Promise<WarehouseDto> => {
    const response = await axiosInstance.post<CustomResponseDto<WarehouseDto>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /** Mevcut bir deponun bilgilerini günceller. (Sadece SuperAdmin) */
  updateAsync: async (updateDto: WarehouseUpdateDto): Promise<WarehouseDto> => {
    const response = await axiosInstance.put<CustomResponseDto<WarehouseDto>>(
      API_URL,
      updateDto,
    );
    return unwrapResponse(response.data);
  },

  /** Belirtilen depoyu sistemden siler (pasife çeker). İçi doluysa silinemez. (Sadece SuperAdmin) */
  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
