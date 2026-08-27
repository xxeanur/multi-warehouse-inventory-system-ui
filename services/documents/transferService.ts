import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";
import {
  TransferOrderCreateDto,
  TransferOrderDispatchDto,
  TransferOrderReceiveDto,
  TransferOrderCancelDto,
  TransferOrderListDto,
  TransferOrderDetailDto,
} from "@/types/documents/transfer";

const API_URL = "/TransferOrders";

export const transferService = {
  /**
   * Yeni bir Transfer fişi oluşturur (Pending).
   * Kaynak depodaki ürünleri sistem otomatik olarak uygun raflardan rezerve (Sıkı Tahsis) eder.
   */
  createAsync: async (createDto: TransferOrderCreateDto): Promise<string> => {
    const response = await axiosInstance.post<CustomResponseDto<string>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Beklemedeki (Pending) transferi yola çıkarır (Dispatch).
   * Rezerve edilen ürünler kaynak deponun fiziksel stoğundan ve kapasitesinden düşülür. Durum InTransit olur.
   */
  dispatchAsync: async (
    dispatchDto: TransferOrderDispatchDto,
  ): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Dispatch`,
      dispatchDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Yoldaki (InTransit) transferi hedef depoya teslim alır (Receive).
   * Seçilen hedef raflara stoklar eklenir, kapasiteler artar. Durum Completed olur.
   */
  receiveAsync: async (receiveDto: TransferOrderReceiveDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Receive`,
      receiveDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Henüz yola çıkmamış (Pending) transferi iptal eder.
   * Sistem, oluşturma anında rezerve ettiği kaynak stokları otomatik olarak serbest bırakır.
   */
  cancelAsync: async (cancelDto: TransferOrderCancelDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Cancel`,
      cancelDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Sistemdeki tüm Transfer fişlerini listeler (RLS Korumalı).
   */
  getAllAsync: async (): Promise<TransferOrderListDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<TransferOrderListDto[]>>(
        API_URL,
      );
    return unwrapResponse(response.data);
  },

  /**
   * Transfer fişlerini DataGrid/Tablo için sayfalayarak (Pagination) listeler.
   */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<TransferOrderListDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<TransferOrderListDto>>
    >(`${API_URL}/Paged`, {
      params,
    });
    return unwrapResponse(response.data);
  },

  /**
   * Sadece Çıkış yapılan (Kaynak) depoya göre transfer fişlerini listeler.
   */
  getBySourceWarehouseIdAsync: async (
    warehouseId: string,
  ): Promise<TransferOrderListDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<TransferOrderListDto[]>
    >(`${API_URL}/SourceWarehouse/${warehouseId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Sadece Giriş yapılacak (Hedef) depoya göre transfer fişlerini listeler.
   */
  getByTargetWarehouseIdAsync: async (
    warehouseId: string,
  ): Promise<TransferOrderListDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<TransferOrderListDto[]>
    >(`${API_URL}/TargetWarehouse/${warehouseId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen ID'ye sahip Transfer fişinin satırlarını, sıkı tahsis (allocation) rezervasyonlarını ve Audit isimlerini getirir.
   */
  getByIdAsync: async (id: string): Promise<TransferOrderDetailDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<TransferOrderDetailDto>
    >(`${API_URL}/${id}`);
    return unwrapResponse(response.data);
  },
};
