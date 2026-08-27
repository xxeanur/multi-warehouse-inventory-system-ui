import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";
import {
  OutboundOrderCreateDto,
  OutboundOrderApproveDto,
  OutboundOrderCancelDto,
  OutboundOrderListDto,
  OutboundOrderDetailDto,
} from "@/types/documents/outbound";

const API_URL = "/OutboundOrders";

export const outboundService = {
  /**
   * Yeni bir Mal Çıkış (Outbound) fişi oluşturur.
   * Bu işlem, çıkışı yapılacak ürünler için depodaki mevcut stokları "Rezerve" eder.
   * @returns Oluşturulan fişin GUID değeri
   */
  createAsync: async (createDto: OutboundOrderCreateDto): Promise<string> => {
    const response = await axiosInstance.post<CustomResponseDto<string>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Beklemede (Pending) olan çıkış fişini onaylar.
   * Personelin raflardan okuttuğu/topladığı gerçek ürün miktarlarını backend'e iletir.
   * Rezerve edilen stoklar kalıcı olarak depodan düşülür.
   */
  approveAsync: async (approveDto: OutboundOrderApproveDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Approve`,
      approveDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Beklemede olan bir fişi iptal eder.
   * Sistem, bu fiş için daha önceden ayırdığı (rezerve ettiği) stokları otomatik olarak serbest bırakır.
   */
  cancelAsync: async (cancelDto: OutboundOrderCancelDto): Promise<void> => {
    const response = await axiosInstance.post<CustomResponseDto<void>>(
      `${API_URL}/Cancel`,
      cancelDto,
    );
    return unwrapResponse(response.data);
  },

  /**
   * Sistemdeki tüm Mal Çıkış fişlerini listeler.
   * Rol bazlı güvenlik (RLS) devrede olduğu için, kullanıcı sadece yetkili olduğu deponun fişlerini görür.
   */
  getAllAsync: async (): Promise<OutboundOrderListDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<OutboundOrderListDto[]>>(
        API_URL,
      );
    return unwrapResponse(response.data);
  },

  /**
   * Mal Çıkış fişlerini DataGrid/Tablo kullanımı için sayfalayarak getirir.
   */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<OutboundOrderListDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<OutboundOrderListDto>>
    >(`${API_URL}/Paged`, {
      params,
    });
    return unwrapResponse(response.data);
  },

  /**
   * Yalnızca parametre olarak verilen spesifik depoya ait çıkış fişlerini listeler.
   */
  getByWarehouseIdAsync: async (
    warehouseId: string,
  ): Promise<OutboundOrderListDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<OutboundOrderListDto[]>
    >(`${API_URL}/Warehouse/${warehouseId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Fiş ID'sine göre, satır detayları, toplanan raf bilgileri ve işlemi yapanların (Audit) isimleriyle birlikte fişi getirir.
   */
  getByIdAsync: async (id: string): Promise<OutboundOrderDetailDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<OutboundOrderDetailDto>
    >(`${API_URL}/${id}`);
    return unwrapResponse(response.data);
  },
};
