// src/services/inventoryCountService.ts

import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { CustomResponseDto } from "@/types/common/common";
import {
  InventoryCountCreateDto,
  InventoryCountResultDto,
} from "@/types/inventory/inventoryCount";

const API_URL = "/InventoryCounts";

export const inventoryCountService = {
  /**
   * Operatörün girdiği fiziki sayım sonucunu backend'e iletir.
   * Backend bu veriyi alarak; stok miktarlarını günceller, raf/depo hacimlerini yeniden hesaplar,
   * eksik/fazla durumuna göre 'StockMovement' defterine otomatik log (Adjustment) atar.
   */
  performCountAsync: async (
    countDto: InventoryCountCreateDto,
  ): Promise<InventoryCountResultDto> => {
    const response = await axiosInstance.post<
      CustomResponseDto<InventoryCountResultDto>
    >(`${API_URL}/PerformCount`, countDto);

    return unwrapResponse(response.data);
  },
};
