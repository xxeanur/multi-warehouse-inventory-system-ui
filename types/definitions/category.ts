export interface CategoryDto {
  id: string; // Backend'deki Guid karşılığı
  name: string;
  description: string;
  createdDate: string;
  isActive: boolean;
}

export interface CategoryCreateDto {
  name: string;
  description: string;
}

export interface CategoryUpdateDto {
  id: string;
  name: string;
  description: string;
}