import { PaginationParams } from "@/types/common/pagination";

export enum MovementType {
  Inbound = 1,
  CustomerReturn = 2,
  Outbound = 3,
  SupplierReturn = 4,
  Scrap = 5,
  TransferIn = 6, // Backend'e göre düzenlendi
  TransferOut = 7, // Backend'e göre düzenlendi
  ShelfTransfer = 8,
  AdjustmentIn = 9, // Backend'e göre düzenlendi
  Reversal = 10,
  AdjustmentOut = 11, // Backend'e göre düzenlendi
}

// Backend'deki StockMovementListDto ile birebir eşleşir.
export interface StockMovementDto {
  id: string;
  warehouseId: string;
  warehouseName: string;
  shelfId: string;
  shelfCode: string;
  productId: string;
  productName: string;
  productCode: string;
  movementType: MovementType;

  // WMS FRONTEND İÇİN EKLENEN ALANLAR
  movementDirection: string;
  movementTypeName: string;

  quantity: number;
  documentId?: string | null;
  documentType: string;
  description: string;
  userId: string;
  operatorName: string;
  createdDate: string;
}

// Backend'deki StockMovementDetailDto ile birebir eşleşir.
export interface StockMovementDetailData extends StockMovementDto {
  documentReference: string;
  operatorRole: string;
  operatorEmail: string;
  isCancelled: boolean;
}

// Backend'deki StockMovementFilterDto ve PaginationParams birleşimi
export interface StockMovementFilterParams extends PaginationParams {
  warehouseId?: string;
  shelfId?: string;
  productId?: string;
  direction?: string;
  movementType?: number;
  documentId?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}
