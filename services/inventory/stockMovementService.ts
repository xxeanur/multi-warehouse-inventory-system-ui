import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  StockMovementDto,
  StockMovementFilterParams,
  StockMovementDetailData,
} from "@/types/inventory/stockMovement";
import { PagedResult, PaginationParams } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/StockMovements";

export const stockMovementService = {
  /**
   * Stok defterindeki hareketleri gelişmiş filtreleme ve sayfalama ile getirir.
   */
  getPagedAsync: async (
    params: StockMovementFilterParams,
  ): Promise<PagedResult<StockMovementDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockMovementDto>>
    >(`${API_URL}/Filtered`, { params });
    return unwrapResponse(response.data);
  },

  /**
   * Stok hareketinin tüm detaylarını (Audit, Operatör, Referans Fişi) getirir.
   * Çekmece (Drawer) açıldığında kullanılır.
   */
  getDetailByIdAsync: async (id: string): Promise<StockMovementDetailData> => {
    const response = await axiosInstance.get<
      CustomResponseDto<StockMovementDetailData>
    >(`${API_URL}/${id}/detail`);
    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir ürüne ait hareket geçmişini sayfalamalı getirir.
   */
  getByProductIdAsync: async (
    productId: string,
    params?: PaginationParams,
  ): Promise<PagedResult<StockMovementDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockMovementDto>>
    >(`${API_URL}/Product/${productId}`, { params });
    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir rafa ait hareket geçmişini sayfalamalı getirir.
   */
  getByShelfIdAsync: async (
    shelfId: string,
    params?: PaginationParams,
  ): Promise<PagedResult<StockMovementDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockMovementDto>>
    >(`${API_URL}/Shelf/${shelfId}`, { params });
    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir fişe (Inbound, Outbound, Transfer) bağlı tüm hareketleri sayfalamalı getirir.
   */
  getByDocumentIdAsync: async (
    documentId: string,
    params?: PaginationParams,
  ): Promise<PagedResult<StockMovementDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockMovementDto>>
    >(`${API_URL}/Document/${documentId}`, { params });
    return unwrapResponse(response.data);
  },
};
