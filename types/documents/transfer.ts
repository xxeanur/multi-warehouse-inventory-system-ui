export interface TransferOrderListDto {
  id: string;
  documentNumber: string;
  sourceWarehouseId: string; 
  targetWarehouseId: string; 
  sourceWarehouseName: string;
  targetWarehouseName: string;
  status: number;
  statusName?: string;
  createdDate: string;

  // YENİ: AUDIT LOG İSİMLERİ (Backend ile 1:1)
  createdByName?: string | null;
  dispatchedByName?: string | null;
  receivedByName?: string | null;
  cancelledByName?: string | null;
}

export interface TransferOrderDetailDto extends TransferOrderListDto {
  description: string;
  lines: TransferOrderLineDto[];
}

export interface TransferOrderLineDto {
  id: string;
  productId: string;
  productName: string;
  productCode: string;
  expectedQuantity: number; 
  dispatchedQuantity: number; 
  receivedQuantity: number; 
  
  // YENİ: Kaynak deponun toplayacağı sistem tarafından ayrılmış raflar (Sıkı Tahsis)
  allocations?: TransferAllocationDto[]; 
}

// YENİ: Sıkı Tahsis Objesi
export interface TransferAllocationDto {
  sourceShelfId: string;
  sourceShelfName: string;
  quantity: number;
}

// --- CREATE DTOs ---
export interface TransferOrderCreateDto {
  sourceWarehouseId: string;
  targetWarehouseId: string;
  description: string;
  lines: TransferOrderLineCreateDto[];
}

export interface TransferOrderLineCreateDto {
  productId: string;
  quantity: number; 
}

// --- DISPATCH (YOLA ÇIKARMA) DTOs ---
export interface TransferOrderDispatchDto {
  transferOrderId: string;
  dispatchedLines: TransferDispatchLineDto[];
}

export interface TransferDispatchLineDto {
  transferOrderLineId: string;
  sourceShelfId: string; 
  quantity: number;
}

// --- RECEIVE (TESLİM ALMA) DTOs ---
export interface TransferOrderReceiveDto {
  transferOrderId: string;
  receivedLines: TransferReceiveLineDto[];
}

export interface TransferReceiveLineDto {
  transferOrderLineId: string;
  quantity: number;
}

// --- CANCEL (İPTAL) DTOs ---
export interface TransferOrderCancelDto {
  transferOrderId: string;
}