// src/types/inventoryCount.ts

export interface InventoryCountCreateDto {
  warehouseId: string;
  shelfId: string;
  productId: string;
  countedQuantity: number;
}

export interface InventoryCountResultDto {
  productId: string;
  productName: string;
  sku: string;
  shelfCode: string;
  systemQuantity: number;
  countedQuantity: number;
  variance: number;
  status: number; // 1: Matched, 2: Shortage, 3: Overage
  statusName: string;
}