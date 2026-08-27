// services/supplierService.ts

import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  SupplierDto,
  SupplierCreateDto,
  SupplierUpdateDto,
} from "@/types/definitions/supplier";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/suppliers";

export const supplierService = {
  /**
   * Tüm aktif tedarikçileri listeler.
   */
  getAllAsync: async (): Promise<SupplierDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<SupplierDto[]>>(API_URL);

    return unwrapResponse(response.data);
  },

  /**
   * Belirtilen ID'ye sahip tedarikçiyi getirir.
   */
  getByIdAsync: async (id: string): Promise<SupplierDto> => {
    const response = await axiosInstance.get<CustomResponseDto<SupplierDto>>(
      `${API_URL}/${id}`,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Yeni tedarikçi oluşturur.
   */
  createAsync: async (createDto: SupplierCreateDto): Promise<SupplierDto> => {
    const response = await axiosInstance.post<CustomResponseDto<SupplierDto>>(
      API_URL,
      createDto,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Tedarikçi bilgilerini günceller.
   */
  updateAsync: async (updateDto: SupplierUpdateDto): Promise<SupplierDto> => {
    const response = await axiosInstance.put<CustomResponseDto<SupplierDto>>(
      API_URL,
      updateDto,
    );

    return unwrapResponse(response.data);
  },

  /**
   * Tedarikçiyi siler (Soft Delete / pasife çeker).
   */
  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
