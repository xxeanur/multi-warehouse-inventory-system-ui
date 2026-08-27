export interface OutboundOrderListDto {
  id: string;
  documentNumber: string;
  destination: string;
  warehouseId: string;
  warehouseName: string;
  movementType: number;
  movementTypeName: string;
  status: number;
  statusName: string;
  createdDate: string;

  // YENİ EKLENEN AUDIT (İŞLEM YAPANLAR) ALANLARI
  createdByName?: string | null;
  approvedByName?: string | null;
  cancelledByName?: string | null;
}

export interface OutboundOrderDetailDto extends OutboundOrderListDto {
  description: string;
  lines: OutboundOrderLineDto[];
}
// En alta bu interface'i ekle
export interface OutboundAllocationDto {
  shelfId: string;
  shelfName: string;
  quantity: number;
}

// OutboundOrderLineDto'yu şu şekilde güncelle:
export interface OutboundOrderLineDto {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  requestedQuantity: number;
  pickedQuantity: number;
  pickedShelf?: string;
  allocations?: OutboundAllocationDto[]; 
}

export interface OutboundOrderCreateDto {
  warehouseId: string;
  destination: string;
  movementType: number;
  description: string;
  lines: OutboundOrderLineCreateDto[];
}

export interface OutboundOrderLineCreateDto {
  productId: string;
  requestedQuantity: number;
}

export interface OutboundOrderApproveDto {
  outboundOrderId: string;
  pickedLines: OutboundApproveLineDto[];
}

export interface OutboundApproveLineDto {
  outboundOrderLineId: string;
  shelfId: string; 
  quantity: number; 
}

export interface OutboundOrderCancelDto {
  outboundOrderId: string;
  // DÜZELTME: 'returnedLines' alanı backend'de (OutboundOrderCancelDto.cs) olmadığı için silindi.
  // İptal işlemi backend tarafında otomatik rezervasyon çözme ile yapılıyor.
}