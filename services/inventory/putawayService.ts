import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { CustomResponseDto } from "@/types/common/common";
import {
  PutawayListDto,
  PutawayDetailDto,
  PutawayRequestDto,
} from "@/types/inventory/putaway";

const API_URL = "/Putaway";

export const putawayService = {
  /**
   * İlgili depoda kapıda onaylanmış (Approved) ve rafa dizilmeyi bekleyen
   * hem Inbound hem de Transfer fişlerini tek bir listede tarih sırasına göre getirir.
   */
  getPendingAsync: async (warehouseId: string): Promise<PutawayListDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PutawayListDto[]>
    >(`${API_URL}/Pending/${warehouseId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Rafa dizilecek fişin detaylarını ve rafa konulması gereken net ürün miktarlarını getirir.
   * @param documentType "Inbound" veya "Transfer" olmalıdır.
   * @param documentId Fişin eşsiz kimliği (GUID).
   */
  getDetailAsync: async (
    documentType: string,
    documentId: string,
  ): Promise<PutawayDetailDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PutawayDetailDto>
    >(`${API_URL}/Detail/${documentType}/${documentId}`);
    return unwrapResponse(response.data);
  },

  /**
   * Kapıda sayımı tamamlanmış ürünlerin raflara yerleştirilme işlemini gerçekleştirir.
   * Başarılı olursa stok bakiyelerini artırır ve raf kapasitelerini günceller.
   */
  executeAsync: async (requestDto: PutawayRequestDto): Promise<boolean> => {
    const response = await axiosInstance.post<CustomResponseDto<boolean>>(
      `${API_URL}/Execute`,
      requestDto,
    );
    return unwrapResponse(response.data);
  },
};
