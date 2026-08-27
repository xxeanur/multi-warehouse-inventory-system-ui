// types/product.ts

// YENİ EKLENDİ: Backend'deki UnitType enum karşılığı için Tip Güvenliği
export enum UnitType {
  Piece = 0,
  Kg = 1,
  Liter = 2,
  Meter = 3,
  Box = 4
}

export interface ProductDto {
  id: string;
  sku: string;
  name: string;
  brand: string;
  imageUrl: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  barcode: string;
  unit: UnitType; // DÜZELTME: number yerine Enum tipi kullanıldı
  unitPrice: number;
  costPrice: number;
  criticalLevel: number;
  categoryId: string;
  supplierId: string;
  createdDate: string;
  isActive: boolean;
}

export interface ProductCreateDto {
  sku: string;
  name: string;
  brand: string;
  imageUrl: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  barcode: string;
  unit: UnitType; // DÜZELTME: number yerine Enum tipi kullanıldı
  unitPrice: number;
  costPrice: number;
  criticalLevel: number;
  categoryId: string;
  supplierId: string;
}

export interface ProductUpdateDto {
  id: string;
  sku: string;
  name: string;
  brand: string;
  imageUrl: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  barcode: string;
  unit: UnitType; // DÜZELTME: number yerine Enum tipi kullanıldı
  unitPrice: number;
  costPrice: number;
  criticalLevel: number;
  categoryId: string;
  supplierId: string;
}