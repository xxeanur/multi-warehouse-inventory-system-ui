// LİSTELEME İÇİN (Hem Inbound hem Transfer fişleri bu modele dönüşüp tek listede akacak)
export interface PutawayListDto {
  documentId: string;
  documentNumber: string;
  documentType: string; // "Inbound" veya "Transfer"
  movementTypeName: string;
  sourceName: string; // Tedarikçi veya Kaynak Depo Adı
  createdDate: string;
}

// DETAY VE RAF SEÇİM EKRANI İÇİN
export interface PutawayDetailDto {
  documentId: string;
  documentNumber: string;
  documentType: string; // "Inbound" veya "Transfer"
  lines: PutawayDetailLineDto[];
}

export interface PutawayDetailLineDto {
  documentLineId: string;
  productId: string;
  productName: string;
  productCode: string;
  quantityToPlace: number; // Kapıda sayılan ve rafa dizilmesi GEREKEN net miktar
}

// İŞLEMİ GERÇEKLEŞTİRİRKEN (Request)
export interface PutawayRequestDto {
  documentId: string;
  documentType: string; // "Inbound" veya "Transfer"
  warehouseId: string; // İşlemi yapan depo
  placedLines: PutawayLineDto[];
}

export interface PutawayLineDto {
  documentLineId: string;
  productId: string;
  shelfId: string; // Hangi rafa konuldu
  quantity: number; // Ne kadar konuldu
}