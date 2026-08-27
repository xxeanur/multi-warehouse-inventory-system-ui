export interface WarehouseOccupancyDto {
  warehouseId: string;
  warehouseName: string;
  usedCapacity: number;
  maxCapacity: number;
  occupancyRate: number;
  latitude: number | null;
  longitude: number | null;
}

export interface CriticalStockDto {
  productId: string;
  sku: string;
  productName: string;
  totalQuantity: number;
  criticalLevel: number;
}

export interface RecentMovementDto {
  id: string; // Artık ID geliyor
  movementType: string;
  productName: string;
  quantity: number;
  movementDate: string;
  referenceNo: string;
  userName: string;
  locationInfo: string; // Artık Lokasyon Bilgisi geliyor
}

export interface DashboardDto {
  totalWarehouses: number;
  totalProducts: number;
  totalActiveStocks: number;
  dailyMovementsCount: number;
  yesterdayMovementsCount: number; // YENİ
  movementIncreasePercentage: number; // YENİ
  
  warehouseOccupancies: WarehouseOccupancyDto[];
  criticalStocks: CriticalStockDto[];
  recentMovements: RecentMovementDto[];
}