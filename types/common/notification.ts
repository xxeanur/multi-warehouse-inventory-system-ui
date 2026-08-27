export enum NotificationType {
  CriticalStock = 0,
  Transfer = 1,
  Inbound = 2,
  Outbound = 3,
  Security = 4
}

// Backend'deki yeni NotificationTargetType Enum'ı
export enum NotificationTargetType {
  None = 0,
  Product = 1,
  InboundOrder = 2,
  OutboundOrder = 3,
  TransferOrder = 4,
  Warehouse = 5,
  Stock = 6
}

export interface NotificationDto {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  type: NotificationType;
  
  // Yeni alanlar
  targetType: NotificationTargetType;
  targetId?: string | null;
  
  createdDate: string;
  isActive: boolean;
}