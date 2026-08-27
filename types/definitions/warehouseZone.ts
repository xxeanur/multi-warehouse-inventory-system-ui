export enum ZoneType {
  General = 0,       // Normal Depolama
  ColdStorage = 1,   // Soğuk Hava Deposu (Gıda vb.)
  Controlled = 2,    // Kontrollü Ortam (Nem/Sıcaklık ayarlı, İlaç vb.)
  Hazardous = 3,     // Tehlikeli Madde (Kimyasal, Yanıcı vb.)
  Quarantine = 4,    // Karantina / Kalite Kontrol (Hasarlı, şüpheli ürünler)
  Returns = 5,       // İade (Müşteriden dönen ürünler)
  HighValue = 6      // Yüksek Değerli Ürünler (Özel güvenlikli)
}

export interface WarehouseZoneDto {
  id: string; 
  zoneName: string;
  zoneType: ZoneType;
  warehouseId: string; 
  createdDate: string;
  isActive: boolean;
}

export interface WarehouseZoneCreateDto {
  zoneName: string;
  zoneType: ZoneType;
  warehouseId: string;
}

export interface WarehouseZoneUpdateDto {
  id: string;
  zoneName: string;
  zoneType: ZoneType;
  warehouseId: string;
}