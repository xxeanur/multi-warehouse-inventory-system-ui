import { unwrapResponse } from "@/lib/apiResponse";
import axiosInstance from "@/lib/axiosInstance";
import { CustomResponseDto } from "@/types/common/common";
import { AuditLogDto } from "@/types/common/audit";

export const auditService = {
  /**
   * Sisteme giriş yapmış olan kullanıcının kendi son güvenlik etkinliklerini getirir.
   */
  getMyRecentSecurityLogsAsync: async (): Promise<AuditLogDto[]> => {
    // Backend'de UsersController içine eklediğimiz endpoint'i çağırıyoruz
    const response = await axiosInstance.get<CustomResponseDto<AuditLogDto[]>>(
      "/Users/my-security-logs",
    );
    return unwrapResponse(response.data);
  },
};
