/**
 * Depodaki rafların operasyonel uygunluğunu belirler.
 */
export enum ShelfStatus {
  Available = 0,   // Kullanıma hazır, boş yer varsa ürün konulabilir
  Maintenance = 1, // Hasarlı veya bakımda, işlem yapılamaz
  Reserved = 2     // Gelecek bir mal kabul için önceden ayrılmış
}

export interface ShelfDto {
  id: string;
  shelfNumber: string;
  width: number;
  height: number;
  depth: number;
  maxVolume: number; 
  maxWeight: number;
  currentVolume: number;
  currentWeight: number;
  status: ShelfStatus;
  warehouseZoneId: string;
  createdDate: string;
  isActive: boolean;
}

export interface ShelfCreateDto {
  shelfNumber: string;
  width: number;
  height: number;
  depth: number;
  maxWeight: number; 
  status: ShelfStatus;
  warehouseZoneId: string;
}

export interface ShelfUpdateDto {
  id: string;
  shelfNumber: string;
  width: number;
  height: number;
  depth: number;
  maxWeight: number; 
  status: ShelfStatus;
  warehouseZoneId: string;
}