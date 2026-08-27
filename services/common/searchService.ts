import axiosInstance from "../../lib/axiosInstance";
import { SearchResultItemDto } from "@/types/common/search";

export const searchService = {
  globalSearchAsync: async (query: string): Promise<SearchResultItemDto[]> => {
    // API'nin döndüğü CustomResponseDto yapısından direkt datayı (listeyi) çıkarıp alıyoruz
    const response = await axiosInstance.get(`/Search?q=${query}`);
    return response.data.data || [];
  },
};
