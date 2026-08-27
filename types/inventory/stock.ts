
export interface StockDto {
  id: string; // Guid
  productId: string; // Guid
  warehouseId: string; // Guid
  shelfId: string; // Guid
  quantity: number;
  reservedQuantity: number;
  lastMovementDate: string; // DateTime string
  createdDate: string; // DateTime string
  isActive: boolean;
}