// services/productService.ts

import axiosInstance from "@/lib/axiosInstance";
import { unwrapResponse } from "@/lib/apiResponse";
import {
  ProductDto,
  ProductCreateDto,
  ProductUpdateDto,
} from "@/types/definitions/product";
import { PaginationParams, PagedResult } from "@/types/common/pagination";
import { CustomResponseDto } from "@/types/common/common";

const API_URL = "/Products";

export const productService = {
  /** Sisteme yeni bir ürün ekler. (Sadece SuperAdmin) */
  createAsync: async (createDto: ProductCreateDto): Promise<ProductDto> => {
    const response = await axiosInstance.post<CustomResponseDto<ProductDto>>(
      API_URL,
      createDto,
    );
    return unwrapResponse(response.data);
  },

  /** Belirtilen ID'ye sahip ürünü detaylarıyla getirir. */
  getByIdAsync: async (id: string): Promise<ProductDto> => {
    const response = await axiosInstance.get<CustomResponseDto<ProductDto>>(
      `${API_URL}/${id}`,
    );
    return unwrapResponse(response.data);
  },

  /** Barkod numarasını okutarak ilgili ürünü getirir. */
  getByBarcodeAsync: async (barcode: string): Promise<ProductDto> => {
    const response = await axiosInstance.get<CustomResponseDto<ProductDto>>(
      `${API_URL}/barcode/${barcode}`,
    );
    return unwrapResponse(response.data);
  },

  /** SKU (Stok Tutma Birimi) kodunu girerek ilgili ürünü getirir. */
  getBySkuAsync: async (sku: string): Promise<ProductDto> => {
    const response = await axiosInstance.get<CustomResponseDto<ProductDto>>(
      `${API_URL}/sku/${sku}`,
    );
    return unwrapResponse(response.data);
  },

  /** İsme veya SKU'ya göre ürünlerde arama yapar (Autocomplete için). */
  searchAsync: async (query: string): Promise<ProductDto[]> => {
    if (!query) return [];
    const response = await axiosInstance.get<CustomResponseDto<ProductDto[]>>(
      `${API_URL}/search`,
      {
        params: { query },
      },
    );
    return unwrapResponse(response.data);
  },

  /** Sistemdeki tüm aktif ürünleri listeler. */
  getAllAsync: async (): Promise<ProductDto[]> => {
    const response =
      await axiosInstance.get<CustomResponseDto<ProductDto[]>>(API_URL);
    return unwrapResponse(response.data);
  },

  /** Sadece belirtilen kategoriye (CategoryId) ait olan ürünleri listeler. */
  getByCategoryIdAsync: async (categoryId: string): Promise<ProductDto[]> => {
    // DÜZELTME: Backend rotası ile birebir uyumlu hale getirildi (category/{categoryId})
    const response = await axiosInstance.get<CustomResponseDto<ProductDto[]>>(
      `${API_URL}/category/${categoryId}`,
    );
    return unwrapResponse(response.data);
  },

  /** Sadece belirtilen tedarikçiden (SupplierId) sağlanan ürünleri listeler. */
  getBySupplierIdAsync: async (supplierId: string): Promise<ProductDto[]> => {
    // DÜZELTME: Backend rotası ile birebir uyumlu hale getirildi (supplier/{supplierId})
    const response = await axiosInstance.get<CustomResponseDto<ProductDto[]>>(
      `${API_URL}/supplier/${supplierId}`,
    );
    return unwrapResponse(response.data);
  },

  /** Mevcut bir ürünün bilgilerini günceller. (Sadece SuperAdmin) */
  updateAsync: async (updateDto: ProductUpdateDto): Promise<ProductDto> => {
    const response = await axiosInstance.put<CustomResponseDto<ProductDto>>(
      API_URL,
      updateDto,
    );
    return unwrapResponse(response.data);
  },

  /** Belirtilen ürünü sistemden siler (pasife çeker). (Sadece SuperAdmin) */
  removeAsync: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  },

  /** Sistemdeki ürünleri sayfalama (Pagination) destekli olarak getirir. */
  getPagedAsync: async (
    params: PaginationParams,
  ): Promise<PagedResult<ProductDto>> => {
    const response = await axiosInstance.get<
      CustomResponseDto<PagedResult<ProductDto>>
    >(`${API_URL}/Paged`, {
      params,
    });
    return unwrapResponse(response.data);
  },
};
