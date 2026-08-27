/**
 * Belge durumlarını belirtir.
 */
export enum DocumentStatus {
  Pending = 1,
  InTransit = 2,
  Completed = 3,
  Cancelled = 4,
  Approved = 5, // Kapıda sayıldı ve kabul edildi (Raflama bekliyor)
}

/**
 * Stok hareket tipini belirtir.
 */
export enum MovementType {
  // GİRİŞ İŞLEMLERİ
  Inbound = 1,           // Mal Kabul
  CustomerReturn = 2,    // Müşteri İadesi

  // ÇIKIŞ İŞLEMLERİ
  Outbound = 3,          // Sevkiyat / Satış
  SupplierReturn = 4,    // Tedarikçi İadesi
  Scrap = 5,             // Fire / Hurda

  // TRANSFER İŞLEMLERİ
  TransferIn = 6,        // Depolar Arası Transfer (Giriş)
  TransferOut = 7,       // Depolar Arası Transfer (Çıkış)
  ShelfTransfer = 8,     // Raflar Arası İç Transfer

  // DÜZELTME İŞLEMLERİ
  AdjustmentIn = 9,      // Sayım Düzeltmesi (Giriş)
  Reversal = 10,         // Ters kayıt
  AdjustmentOut = 11     // Sayım Eksiği (Çıkış)
}

export interface InboundOrderListDto {
  id: string;
  documentNumber: string;
  supplierName?: string; // Tedarikçi olmayabilir
  warehouseId: string;
  warehouseName: string;
  movementType: MovementType;
  movementTypeName: string;
  status: DocumentStatus;
  statusName: string;
  createdDate: string;
  sourceTransferOrderId?: string | null; // Transfer köprüsü
}

export interface InboundOrderDetailDto extends InboundOrderListDto {
  description: string;
  lines: InboundOrderLineDto[];
  //log
  createdByName?: string | null;
  approvedByName?: string | null;
  cancelledByName?: string | null;
}


export interface InboundOrderLineDto {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  expectedQuantity: number;
  receivedQuantity: number;
}

export interface InboundOrderCreateDto {
  supplierId?: string | null;
  warehouseId: string;
  movementType: MovementType;
  description: string;
  lines: InboundOrderLineCreateDto[];
}

export interface InboundOrderLineCreateDto {
  productId: string;
  expectedQuantity: number;
}

export interface InboundOrderApproveDto {
  inboundOrderId: string;
  approvedLines: InboundApproveLineDto[];
}

export interface InboundApproveLineDto {
  inboundOrderLineId: string;
  // DÜZELTME: Backend'de isim ReceivedQuantity olarak bekleniyor. 
  // (shelfId backend'den Putaway operasyonuna taşındığı için kaldırıldı)
  receivedQuantity: number; 
}