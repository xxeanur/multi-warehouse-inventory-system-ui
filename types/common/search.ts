export enum SearchTargetType {
  None = 0,
  Product = 1,
  InboundOrder = 2,
  OutboundOrder = 3,
  TransferOrder = 4,
  Warehouse = 5
}

export interface SearchResultItemDto {
  category: string;
  title: string;
  subtitle: string;
  targetType: SearchTargetType; // Backend'den gelen
  targetId: string; // Backend'den gelen
}