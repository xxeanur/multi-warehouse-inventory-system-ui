import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import { DashboardDto } from "@/types/common/dashboard";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/dashboard";

export const dashboardService = {
  /**
   * Dashboard ekranı için gerekli tüm özet bilgileri (kartlar, grafikler, son hareketler vb.)
   * tek bir JSON olarak döner.
   */
  getDashboardDataAsync: async (): Promise<DashboardDto> => {
    const response =
      await axiosInstance.get<CustomResponseDto<DashboardDto>>(API_URL);
    return unwrapResponse(response.data);
  },
};
