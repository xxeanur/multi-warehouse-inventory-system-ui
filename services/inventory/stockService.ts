import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { StockDto } from "@/types/inventory/stock";
import { CustomResponseDto } from "@/types/common/common";
import { PaginationParams, PagedResult } from "@/types/common/pagination";

const API_URL = "/stocks";

export const stockService = {
  /**
   * Belirtilen ID'ye sahip stok kaydını getirir.
   */
  getByIdAsync: async (id: string): Promise<StockDto> => {
    const response = await axiosInstance.get<CustomResponseDto<StockDto>>(
      `${API_URL}/${id}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Tüm sistemdeki aktif stok kayıtlarını listeler.
   */
  getAllAsync: async (): Promise<StockDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<StockDto[]>>(API_URL);
    return unwrapResponse(response.data);
  },

  /**
   * Bir ürünün tüm depolardaki ve raflardaki dağılımını (stoklarını) listeler.
   */
  getByProductIdAsync: async (productId: string): Promise<StockDto[]> => {
    const response = await axiosInstance.get<CustomResponseDto<StockDto[]>>(
      `${API_URL}/GetByProductId/${productId}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir depodaki tüm stokları listeler.
   */
  getByWarehouseIdAsync: async (warehouseId: string): Promise<StockDto[]> => {
    const response = await axiosInstance.get<CustomResponseDto<StockDto[]>>(
      `${API_URL}/GetByWarehouseId/${warehouseId}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Sadece tek bir rafta bulunan ürünlerin stok durumunu listeler.
   */
  getByShelfIdAsync: async (shelfId: string): Promise<StockDto[]> => {
    const response = await axiosInstance.get<CustomResponseDto<StockDto[]>>(
      `${API_URL}/GetByShelfId/${shelfId}`,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Sistemdeki tüm stokları sayfalama (Pagination) destekli olarak getirir.
   */
  getPagedAsync: async (
    paginationParams: PaginationParams,
  ): Promise<PagedResult<StockDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockDto>>
    >(`${API_URL}/Paged`, {
      params: paginationParams,
    });
    return unwrapResponse(response.data);
  },

  /**
   * Sadece belirtilen ürüne ait stokları sayfalayarak getirir.
   */
  getPagedByProductAsync: async (
    paginationParams: PaginationParams,
    productId: string,
  ): Promise<PagedResult<StockDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockDto>>
    >(`${API_URL}/PagedByProduct/${productId}`, {
      params: paginationParams,
    });
    return unwrapResponse(response.data);
  },

  /**
   * Sadece belirtilen depoya ait stokları sayfalayarak getirir.
   */
  getPagedByWarehouseAsync: async (
    paginationParams: PaginationParams,
    warehouseId: string,
  ): Promise<PagedResult<StockDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockDto>>
    >(`${API_URL}/PagedByWarehouse/${warehouseId}`, {
      params: paginationParams,
    });
    return unwrapResponse(response.data);
  },

  /**
   * Sadece belirtilen rafa ait stokları sayfalayarak getirir.
   */
  getPagedByShelfAsync: async (
    paginationParams: PaginationParams,
    shelfId: string,
  ): Promise<PagedResult<StockDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<StockDto>>
    >(`${API_URL}/PagedByShelf/${shelfId}`, {
      params: paginationParams,
    });
    return unwrapResponse(response.data);
  },
};
