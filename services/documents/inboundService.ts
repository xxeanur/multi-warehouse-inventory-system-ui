import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";
import {
  InboundOrderCreateDto,
  InboundOrderApproveDto,
  InboundOrderListDto,
  InboundOrderDetailDto,
} from "@/types/documents/inbound";

const API_URL = "/InboundOrders";

export const inboundService = {
  /**
   * Yeni bir Mal Kabul (Inbound) fişi oluşturur. Durumu "Pending" olarak atanır.
   * Başarılı olursa siparişin GUID'sini (string) döner.
   */
  createAsync: async (createDto: InboundOrderCreateDto): Promise<string> => {
    const response = await axiosInstance.post<CustomResponseDto<string>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Beklemede olan bir fişin mallarını kapıda sayar ve onaylar (Approved).
   * Raflama için Putaway servisi beklenir.
   */
  approveAsync: async (approveDto: InboundOrderApproveDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Approve`,
      approveDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Tamamlanmamış (Completed olmayan) bir Mal Kabul fişini iptal eder.
   */
  cancelAsync: async (id: string): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/${id}/Cancel`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Sistemdeki tüm Mal Kabul fişlerini listeler. (RLS kuralı gereği sadece yetkili olunanlar döner)
   */
  getAllAsync: async (): Promise<InboundOrderListDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<InboundOrderListDto[]>>(
        API_URL,
      );
    return unwrapResponse(response.data);
  },

  /**
   * Mal Kabul fişlerini sayfalayarak (Pagination) listeler.
   */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<InboundOrderListDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<InboundOrderListDto>>
    >(`${API_URL}/Paged`, { params });
    return unwrapResponse(response.data);
  },

  /**
   * Sadece belirtilen depoya ait Mal Kabul fişlerini listeler.
   */
  getByWarehouseIdAsync: async (
    warehouseId: string,
  ): Promise<InboundOrderListDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<InboundOrderListDto[]>
    >(`${API_URL}/Warehouse/${warehouseId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen ID'ye sahip Mal Kabul fişinin, satır ve ürün detaylarını getirir.
   */
  getByIdAsync: async (id: string): Promise<InboundOrderDetailDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<InboundOrderDetailDto>
    >(`${API_URL}/${id}`);
    return unwrapResponse(response.data);
  },
};
