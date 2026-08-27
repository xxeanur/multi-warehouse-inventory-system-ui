import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  WarehouseZoneDto,
  WarehouseZoneCreateDto,
  WarehouseZoneUpdateDto,
} from "@/types/definitions/warehouseZone";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/WarehouseZones";

export const warehouseZoneService = {
  /**
   * Sistemdeki tüm aktif alanları/blokları listeler.
   * (Kullanıcı sadece yetkisi olan depolardaki blokları görür).
   */
  getAllAsync: async (): Promise<WarehouseZoneDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<WarehouseZoneDto[]>>(API_URL);

    return unwrapResponse(response.data);
  },

  /**
   * Belirli bir deponun içindeki alanları/blokları listeler.
   */
  getByWarehouseIdAsync: async (
    warehouseId: string,
  ): Promise<WarehouseZoneDto[]> => {
    const response = await axiosInstance.get<
      CustomResponseDto<WarehouseZoneDto[]>
    >(`${API_URL}/GetByWarehouseId/${warehouseId}`);

    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen ID'ye sahip depo alanını detaylarıyla getirir.
   */
  getByIdAsync: async (id: string): Promise<WarehouseZoneDto> => {
    const response = await axiosInstance.get<
      CustomResponseDto<WarehouseZoneDto>
    >(`${API_URL}/${id}`);

    return unwrapResponse(response.data);
  },

  /**
   * Depo içine yeni bir blok/alan ekler.
   * (Sadece SuperAdmin veya ilgili deponun müdürü yapabilir).
   */
  createAsync: async (
    createDto: WarehouseZoneCreateDto,
  ): Promise<WarehouseZoneDto> => {
    const response = await axiosInstance.post<
      CustomResponseDto<WarehouseZoneDto>
    >(API_URL, createDto);

    return unwrapResponse(response.data);
  },

  /**
   * Mevcut bir depo alanını (bloğu) günceller.
   */
  updateAsync: async (
    updateDto: WarehouseZoneUpdateDto,
  ): Promise<WarehouseZoneDto> => {
    const response = await axiosInstance.put<
      CustomResponseDto<WarehouseZoneDto>
    >(API_URL, updateDto);

    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen depo alanını sistemden siler (pasife çeker).
   */
  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
