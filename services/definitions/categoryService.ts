import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  CategoryDto,
  CategoryCreateDto,
  CategoryUpdateDto,
} from "@/types/definitions/category";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/categories";

export const categoryService = {
  getAllAsync: async (): Promise<CategoryDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<CategoryDto[]>>(API_URL);

    return unwrapResponse(response.data);
  },

  getByIdAsync: async (id: string): Promise<CategoryDto> => {
    const response = await axiosInstance.get<CustomResponseDto<CategoryDto>>(
      `${API_URL}/${id}`,
    );

    return unwrapResponse(response.data);
  },

  createAsync: async (createDto: CategoryCreateDto): Promise<CategoryDto> => {
    const response = await axiosInstance.post<CustomResponseDto<CategoryDto>>(
      API_URL,
      createDto,
    );

    return unwrapResponse(response.data);
  },

  updateAsync: async (updateDto: CategoryUpdateDto): Promise<CategoryDto> => {
    const response = await axiosInstance.put<CustomResponseDto<CategoryDto>>(
      API_URL,
      updateDto,
    );

    return unwrapResponse(response.data);
  },

  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },
};
