import { CustomResponseDto } from "@/types/common/common";

export function unwrapResponse<T>(response: CustomResponseDto<T>): T {
  if (!response.success || response.data === null) {
    throw new Error(
      response.errorMessage?.[0] ?? "Sunucudan geçerli veri alınamadı.",
    );
  }

  return response.data;
}
